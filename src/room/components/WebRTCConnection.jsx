import React, { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const WebRTCConnection = ({ roomId, userId, localVideoRef, remoteVideoRef, setLocalStream }) => {
    const myUserId = userId;

    const peerRef = useRef({});
    const stompClientRef = useRef(null);
    const roomIdRef = useRef(roomId);
    const signalQueueRef = useRef([]);
    const peerReadyRef = useRef(false);
    const localStreamRef = useRef(null);

    const rtcConfig = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    useEffect(() => {
        roomIdRef.current = roomId;
    }, [roomId]);

    useEffect(() => {
        if (!myUserId) {
            console.warn("userId 없음. WebRTC 연결 차단됨");
            return;
        }

        const stompClient = new Client({
            brokerURL: "wss://passmaker.kro.kr/ws",
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe(`/topic/room/${roomId}`, async (message) => {
                    try {
                        const signal = JSON.parse(message.body);
                        console.log("시그널 수신:", signal);
                        await handleSignal(signal);
                    } catch (e) {
                        console.error("시그널 파싱 실패", e);
                    }
                });

                initLocalStream().then(() => {
                    peerReadyRef.current = true;
                    signalQueueRef.current.forEach((sig) => handleSignal(sig));
                    signalQueueRef.current = [];
                    sendSignal({ type: "join", sender: myUserId });
                });
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            stompClient.deactivate();
        };
    }, [myUserId]);

    const initLocalStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideoRef.current.srcObject = stream;
        localStreamRef.current = stream;
        setLocalStream(stream);
    };

    const createPeerConnection = (otherUserId, stream) => {
        const peer = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
        });

        peerRef.current[otherUserId] = peer;

        stream.getTracks().forEach((track) => {
            peer.addTrack(track, stream);
        });

        peer.onicecandidate = (e) => {
            if (e.candidate) {
                sendSignal({
                    type: "candidate",
                    data: e.candidate,
                    sender: myUserId,
                    receiver: otherUserId,
                });
            }
        };

        peer.oniceconnectionstatechange = () => {
            console.log(`🌐 ICE 상태(${otherUserId}):`, peer.iceConnectionState);
        };

        peer.ontrack = (e) => {
            console.log("📡 ontrack fired from", otherUserId, e.streams);
            const stream = e.streams[0];
            if (!remoteVideoRef.current) {
                console.warn("❌ remoteVideoRef is null");
                return;
            }

            remoteVideoRef.current.srcObject = stream;
            remoteVideoRef.current.autoplay = true;
            remoteVideoRef.current.playsInline = true;
            remoteVideoRef.current.muted = false;

            const tryPlay = () => {
                remoteVideoRef.current.play().catch((err) => {
                    console.warn("🔇 remote video 재생 실패:", err.message);
                    setTimeout(tryPlay, 300);
                });
            };
            tryPlay();
        };

        return peer;
    };


    const sendSignal = (signal) => {
        const currentRoomId = roomIdRef.current;
        if (!currentRoomId) return;

        stompClientRef.current.publish({
            destination: "/app/signal",
            body: JSON.stringify({ ...signal, roomId: String(currentRoomId) }),
        });
    };

    const handleSignal = async (signal) => {
        const { type, sender, data } = signal;
        if (sender === myUserId) return;

        if (!peerRef.current[sender]) {
            peerRef.current[sender] = createPeerConnection(sender, localStreamRef.current);
        }

        const peer = peerRef.current[sender];


        switch (type) {
            case "join":
                if (myUserId < sender) {
                    const offer = await peer.createOffer();
                    await peer.setLocalDescription(offer);
                    console.log("🔥 offer 생성됨:", offer);
                    sendSignal({ type: "offer", data: offer, sender: myUserId, receiver: sender });
                    console.log("📨 offer 보냄 to:", sender);
                }
                break;

            case "offer":
                await peer.setRemoteDescription(new RTCSessionDescription(data));
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                sendSignal({ type: "answer", data: answer, sender: myUserId, receiver: sender });


                const pending = signalQueueRef.current.filter((s) => s.sender === sender);
                signalQueueRef.current = signalQueueRef.current.filter((s) => s.sender !== sender);
                for (const queued of pending) await handleSignal(queued);
                break;

            case "answer":
                try {
                    const senderId = sender; // 수정: signal.sender를 사용해야 함

                    let peer = peerRef.current[senderId];
                    if (!peer) {
                        console.warn("🛠️ peer가 없어 자동 생성 시도:", senderId);

                        if (!localStreamRef.current) {
                            console.error("❌ localStream이 아직 없습니다. peer 생성 실패");
                            return;
                        }

                        peer = createPeerConnection(senderId, localStreamRef.current);
                        peerRef.current[senderId] = peer;
                    }

                    const remoteDesc = new RTCSessionDescription(data);

                    if (peer.signalingState === "have-local-offer") {
                        await peer.setRemoteDescription(remoteDesc);
                        console.log("✅ answer 설정 성공:", senderId);
                    } else if (peer.signalingState === "stable") {
                        console.warn("⚠️ 이미 stable 상태, answer 설정 생략:", senderId);
                    } else {
                        console.warn("❓ 예상치 못한 signalingState:", peer.signalingState);
                    }
                } catch (err) {
                    console.error("❌ answer 처리 중 오류:", err);
                }
                break;

            // case "answer":
            //     try {
            //         // 상대방 ID
            //         const senderId = data.sender;
            //
            //         // 상대방 peer가 없으면 에러 로그 출력
            //         const peer = peerRef.current[senderId];
            //         if (!peer) {
            //             console.warn("❌ answer 처리 실패: 해당 peer가 없습니다.", senderId);
            //             // 💡 필요시 여기서 자동으로 peer를 생성할 수도 있음
            //             // peerRef.current[senderId] = createPeerConnection(senderId, localStream);
            //             // return; 또는 아래 로직 계속
            //             return;
            //         }
            //
            //         const remoteDesc = new RTCSessionDescription(data);
            //
            //         // signalingState가 stable이면 보통 answer를 설정하면 안 되지만,
            //         // 중복 연결을 허용할 경우엔 무시할 수 있음
            //         if (peer.signalingState === "stable") {
            //             console.warn("⚠️ peer signalingState가 이미 stable입니다. answer 무시할 가능성 있음");
            //         }
            //
            //         await peer.setRemoteDescription(remoteDesc);
            //         console.log("✅ answer 설정 성공 from:", senderId);
            //     } catch (err) {
            //         console.error("❌ answer 처리 중 오류:", err);
            //     }
            //     break;



            case "candidate":
                if (!data || !data.candidate) return;

                if (peer.remoteDescription?.type) {
                    await peer.addIceCandidate(new RTCIceCandidate(data));
                } else {
                    signalQueueRef.current.push(signal);
                }
                break;

            default:
                console.warn("알 수 없는 시그널 타입:", type);
        }
    };

    return null;
};

export default WebRTCConnection;

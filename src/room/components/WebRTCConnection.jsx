import React, { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const WebRTCConnection = ({ roomId, localVideoRef, remoteVideoRef, setLocalStream }) => {
    const peerRef = useRef(null);
    const stompClientRef = useRef(null);

    const rtcConfig = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        const stompClient = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: "Bearer " + token,
            },
            onConnect: () => {
                stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
                    const signal = JSON.parse(message.body);
                    handleSignal(signal);
                });

                stompClient.publish({
                    destination: "/app/signal",
                    body: JSON.stringify({ type: "join", roomId }),
                });

                initLocalStream();
            },
            onStompError: (frame) => {
                console.error("STOMP error", frame);
            },
        });

        stompClient.activate();
        stompClientRef.current = stompClient;

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const initLocalStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        localVideoRef.current.srcObject = stream;
        setLocalStream(stream);

        const peer = new RTCPeerConnection(rtcConfig);
        peerRef.current = peer;

        stream.getTracks().forEach((track) => {
            peer.addTrack(track, stream);
        });

        peer.onicecandidate = (e) => {
            if (e.candidate) {
                sendSignal({ type: "candidate", roomId, candidate: e.candidate });
            }
        };

        peer.ontrack = (e) => {
            console.log("📡 상대방 스트림 수신", e.streams);
            remoteVideoRef.current.srcObject = e.streams[0];
        };
    };

    const handleSignal = async (signal) => {
        const peer = peerRef.current;

        switch (signal.type) {
            case "offer":
                await peer.setRemoteDescription(new RTCSessionDescription(signal.data));
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                sendSignal({ type: "answer", roomId, data: answer });
                break;
            case "answer":
                await peer.setRemoteDescription(new RTCSessionDescription(signal.data));
                break;
            case "candidate":
                if (signal.candidate) {
                    peer.addIceCandidate(new RTCIceCandidate(signal.candidate));
                }
                break;
            case "join":
                if (peer.signalingState === "stable") {
                    const offer = await peer.createOffer();
                    await peer.setLocalDescription(offer);
                    sendSignal({ type: "offer", roomId, data: offer });
                }
                break;
            default:
                break;
        }
    };

    const sendSignal = (message) => {
        stompClientRef.current.publish({
            destination: "/app/signal",
            body: JSON.stringify(message),
        });
    };

    return null;
};

export default WebRTCConnection;

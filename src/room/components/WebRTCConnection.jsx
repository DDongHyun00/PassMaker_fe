import React, { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const WebRTCConnection = ({
                            roomId,
                            userId,
                            localVideoRef,
                            remoteVideoRef,
                            setLocalStream,
                          }) => {
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
    if (!myUserId) return;

    // ✅ 먼저 localStream 확보 후 시그널링 시작
    initLocalStream().then(() => {
      const stompClient = new Client({
        brokerURL: "wss://passmaker.kro.kr/ws",
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe(`/topic/room/${roomId}`, async (message) => {
            const signal = JSON.parse(message.body);
            await handleSignal(signal);
          });

          peerReadyRef.current = true;
          signalQueueRef.current.forEach((sig) => handleSignal(sig));
          signalQueueRef.current = [];
          sendSignal({ type: "join", sender: myUserId });
        },
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
    });
  }, [myUserId]);

  const initLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;
    localStreamRef.current = stream;
    setLocalStream(stream);
  };

  const createPeerConnection = (otherUserId, stream) => {
    if (!stream) {
      console.error("❌ localStream 없음 - peer 생성 차단:", otherUserId);
      return null;
    }

    const peer = new RTCPeerConnection(rtcConfig);
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
      const stream = e.streams[0];
      console.log("📡 ontrack fired:", stream);
      if (!remoteVideoRef.current) return;

      if (remoteVideoRef.current.srcObject !== stream) {
        remoteVideoRef.current.srcObject = stream;
        remoteVideoRef.current.autoplay = true;
        remoteVideoRef.current.playsInline = true;
        remoteVideoRef.current.muted = false;

        remoteVideoRef.current
            .play()
            .then(() => console.log("▶️ remote video 재생 성공"))
            .catch((err) =>
                console.warn("🔇 remote video 재생 실패:", err.message)
            );
      }
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

    // peer 생성 (localStream 없이 생기면 안 됨)
    if (!peerRef.current[sender]) {
      const peer = createPeerConnection(sender, localStreamRef.current);
      if (!peer) {
        console.warn("⏳ localStream 없어서 peer 생성 보류:", sender);
        signalQueueRef.current.push(signal); // 재시도용
        return;
      }
    }

    const peer = peerRef.current[sender];

    switch (type) {
      case "join":
        if (myUserId < sender) {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          sendSignal({
            type: "offer",
            data: offer,
            sender: myUserId,
            receiver: sender,
          });
        }
        break;

      case "offer":
        if (!peer) return;
        await peer.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        sendSignal({
          type: "answer",
          data: answer,
          sender: myUserId,
          receiver: sender,
        });

        // 대기 중이던 candidate들 다시 처리
        const pending = signalQueueRef.current.filter(
            (s) => s.sender === sender
        );
        signalQueueRef.current = signalQueueRef.current.filter(
            (s) => s.sender !== sender
        );
        for (const queued of pending) await handleSignal(queued);
        break;

      case "answer":
        if (!peer) return;
        const remoteDesc = new RTCSessionDescription(data);
        if (peer.signalingState === "stable") {
          console.warn("⚠️ 이미 stable 상태 - 중복 answer 무시");
          return;
        }
        await peer.setRemoteDescription(remoteDesc);
        break;

      case "candidate":
        if (!peer) {
          signalQueueRef.current.push(signal);
          return;
        }

        if (peer.remoteDescription?.type) {
          await peer.addIceCandidate(new RTCIceCandidate(data));
        } else {
          signalQueueRef.current.push(signal);
        }
        break;

      default:
        console.warn("⚠️ 알 수 없는 시그널 타입:", type);
    }
  };

  return null;
};

export default WebRTCConnection;

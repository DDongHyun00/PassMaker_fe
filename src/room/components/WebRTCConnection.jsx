// src/components/WebRTCConnection.jsx
import React, { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const WebRTCConnection = ({
  roomId,
  userId,
  localVideoRef,
  remoteVideoRef,
  setLocalStream,
}) => {
  const peerRef        = useRef({});
  const stompClientRef = useRef(null);
  const localStreamRef = useRef(null);
  const queueRef       = useRef([]);
  const readyRef       = useRef(false);

  const rtcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    if (!userId) return console.warn("userId 없음; WebRTC 차단");

    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/room/${roomId}`, async (msg) => {
          const signal = JSON.parse(msg.body);
          if (signal.sender === userId) return;
          if (!readyRef.current) {
            queueRef.current.push(signal);
          } else {
            await handleSignal(signal);
          }
        });

        initLocalStream().then(async () => {
          readyRef.current = true;
          for (let s of queueRef.current) await handleSignal(s);
          queueRef.current = [];
          sendSignal({ type: "join", sender: userId });
        });
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => client.deactivate();
  }, [userId, roomId]);

//   const initLocalStream = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     localVideoRef.current.srcObject = stream;
//     localStreamRef.current          = stream;
//     setLocalStream(stream);
//   };
// ↓ 여기를 이렇게 바꿔주세요
  const initLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideoRef.current.srcObject = stream;
      localStreamRef.current          = stream;
      setLocalStream(stream);
    } catch (err) {
      console.error("🔥 getUserMedia 실패:", err);
      alert("카메라/마이크 권한이 필요합니다. 설정에서 허용해 주세요.");
    }
  };

  const sendSignal = (signal) => {
    stompClientRef.current.publish({
      destination: "/app/signal",
      body: JSON.stringify({ ...signal, roomId: String(roomId) }),
    });
  };

  const createPeer = (other) => {
    const peer = new RTCPeerConnection(rtcConfig);
    localStreamRef.current.getTracks().forEach((t) =>
      peer.addTrack(t, localStreamRef.current)
    );
    peer.onicecandidate = (e) => {
      if (e.candidate) {
        sendSignal({
          type: "candidate",
          data: e.candidate,
          sender: userId,
          receiver: other,
        });
      }
    };
    peer.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
      remoteVideoRef.current
        .play()
        .catch(() => setTimeout(() => remoteVideoRef.current.play(), 300));
    };
    return peer;
  };

  const handleSignal = async ({ type, sender, data }) => {
    let peer = peerRef.current[sender];
    if (!peer) peerRef.current[sender] = peer = createPeer(sender);

    switch (type) {
      case "join":
        if (userId < sender) {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          sendSignal({
            type: "offer",
            data: offer,
            sender: userId,
            receiver: sender,
          });
        }
        break;

      case "offer":
        await peer.setRemoteDescription(new RTCSessionDescription(data));
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        sendSignal({
          type: "answer",
          data: answer,
          sender: userId,
          receiver: sender,
        });
        break;

      case "answer":
        if (peer.signalingState === "have-local-offer") {
          await peer.setRemoteDescription(new RTCSessionDescription(data));
        }
        break;

      case "candidate":
        if (peer.remoteDescription) {
          await peer.addIceCandidate(new RTCIceCandidate(data));
        }
        break;

      default:
        console.warn("Unknown signal:", type);
    }
  };

  return null;
};

export default WebRTCConnection;

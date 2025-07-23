// src/components/VideoArea.jsx
import React, { useRef, useEffect, useState } from "react";
import WebRTCConnection from "./WebRTCConnection.jsx";
import AudioRecorder from "./AudioRecorder";
import { useParams } from "react-router-dom";
import { Rnd } from "react-rnd";

const VideoArea = ({
  timer,
  cameraEnabled,
  micEnabled,
  setLocalStream: setParentStream,
  userId,
}) => {
  const { roomId: roomIdParam } = useParams();
  const roomId = parseInt(roomIdParam, 10);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const audioRef = useRef(null);
  const localStreamRef = useRef(null);

  // ▶ 로컬 스트림을 state 로도 보관
  const [localStream, setLocalStream] = useState(null);
  const [hasSetStream, setHasSetStream] = useState(false);

  function checkMicEnabled(stream) {
    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) {
      console.log("마이크 트랙 없음");
      return;
    }
    console.log("마이크 상태:", audioTrack.enabled ? "켜짐" : "꺼짐");
  }

  // WebRTCConnection → 여기로 스트림이 넘어옵니다
  const handleSetLocalStream = (stream) => {
    if (hasSetStream) return; // 이미 세팅된 스트림이 있으면 스킵
    setHasSetStream(true);

    localStreamRef.current = stream;
    setParentStream(stream); // 부모(MentoringRoomPage)에 전달
    setLocalStream(stream); // 이 컴포넌트도 리렌더링 유도
    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }
    checkMicEnabled(stream);
  };

  // audio 태그에 초기 스트림 연결
  useEffect(() => {
    if (localStream && audioRef.current) {
      audioRef.current.srcObject = localStream;
    }
  }, [localStream]);

  console.log("VideoArea 렌더링됨. userId:", userId);

  return (
    <div className="grow w-screen h-[calc(100vh-80px)] bg-black relative overflow-hidden">
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <Rnd
        default={{ x: 20, y: 100, width: 320, height: 180 }}
        minWidth={160}
        minHeight={90}
        bounds="parent"
        lockAspectRatio={16 / 9}
        className="absolute z-20 rounded-xl overflow-hidden shadow-lg border-2 border-purple-500"
      >
        <div className="w-full h-full bg-black drag-handle flex items-center justify-center relative">
          <p className="text-white text-sm absolute top-2 left-2 z-10">
            나의 화면
          </p>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </Rnd>

      {roomId && (
        <WebRTCConnection
          roomId={roomId}
          userId={userId}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          setLocalStream={handleSetLocalStream}
        />
      )}

      <audio
        ref={audioRef}
        autoPlay
        controls
        className="absolute bottom-2 left-2 w-[200px] z-50 bg-white rounded"
      />

      {/* ▶ localStream state 가 설정되면 AudioRecorder 마운트 */}
      {roomId && localStream && (
        <AudioRecorder localStream={localStream} roomId={roomId} />
      )}
    </div>
  );
};

export default VideoArea;

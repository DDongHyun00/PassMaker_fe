// src/components/AudioRecorder.jsx
import { useEffect } from "react";

const AudioRecorder = ({ localStream, roomId }) => {
  useEffect(() => {
    if (!localStream || !roomId) {
      console.warn("녹음 시작 안함: localStream 또는 roomId 없음");
      return;
    }

    // 1️⃣ 브라우저가 MediaRecorder를 지원하는지 확인
    if (typeof window.MediaRecorder === "undefined") {
      console.error("❌ 이 브라우저는 MediaRecorder를 지원하지 않습니다.");
      return;
    }

    // 2️⃣ 스트림에 오디오 트랙이 있는지 확인
    const audioTracks = localStream.getAudioTracks();
    if (!audioTracks || audioTracks.length === 0) {
      console.error("❌ 오디오 트랙이 없습니다. getUserMedia({ audio: true })를 확인하세요.");
      return;
    }

    // 3️⃣ localStream에서 audio 트랙만 뽑아 새로운 MediaStream 생성
    const audioStream = new MediaStream(audioTracks);

    // 4️⃣ 지원 가능한 MIME 타입 중 하나를 골라 지정
    const preferredMime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : MediaRecorder.isTypeSupported("audio/webm")
      ? "audio/webm"
      : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
      ? "audio/ogg;codecs=opus"
      : "";

    if (!preferredMime) {
      console.error("❌ 지원하는 오디오 녹음 MIME 타입이 없습니다.");
      return;
    }

    let mediaRecorder;
    try {
      // 5️⃣ MediaRecorder 인스턴스 생성 (audioStream만 사용)
      mediaRecorder = new MediaRecorder(audioStream, { mimeType: preferredMime });
    } catch (err) {
      console.error("❌ MediaRecorder 생성 실패:", err);
      return;
    }

    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: preferredMime });
      const audioFile = new File([audioBlob], "audio.webm", { type: preferredMime });

      const formData = new FormData();
      formData.append("audioFile", audioFile);
      formData.append("roomId", roomId);

      try {
        const res = await fetch("http://localhost:8080/api/stt/upload-audio", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          console.log("🎤 녹음 업로드 성공");
        } else {
          console.error("❌ 업로드 실패", await res.text());
        }
      } catch (err) {
        console.error("❌ 업로드 오류", err);
      }
    };

    try {
      // 6️⃣ 녹음 시작
      mediaRecorder.start();
      console.log(`🎙 MediaRecorder 시작됨 (MIME: ${preferredMime})`);
    } catch (err) {
      console.error("❌ MediaRecorder.start() 실패:", err);
      return;
    }

    // 20분 후 자동 정지
    const stopTimer = setTimeout(() => {
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("⏹ MediaRecorder 자동 종료");
      }
    }, 20 * 60 * 1000);

    return () => {
      // 컴포넌트 언마운트 시 정리
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("🧹 컴포넌트 unmount → MediaRecorder 종료");
      }
      clearTimeout(stopTimer);
    };
  }, [localStream, roomId]);

  return null; // UI가 필요 없으면 null
};

export default AudioRecorder;

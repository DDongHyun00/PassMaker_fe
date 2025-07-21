// src/components/AudioRecorder.jsx
import { useEffect } from "react";

const AudioRecorder = ({ localStream, roomId }) => {
  useEffect(() => {
    if (!localStream || !roomId) {
      console.warn("녹음 시작 안함: localStream 또는 roomId 없음");
      return;
    }

    const mediaRecorder = new MediaRecorder(localStream, { mimeType: "audio/webm" });
    const audioChunks = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        audioChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioFile = new File([audioBlob], "audio.webm", { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audioFile", audioFile); // ✅ key name 꼭 맞춰야 함!
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

    mediaRecorder.start();
    console.log("🎙 MediaRecorder 시작됨");

    const stopTimer = setTimeout(() => {
      mediaRecorder.stop();
      console.log("⏹ MediaRecorder 자동 종료");
    }, 20 * 60 * 1000); // 20분 후 자동 종료

    return () => {
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("🧹 컴포넌트 unmount → MediaRecorder 종료");
      }
      clearTimeout(stopTimer);
    };
  }, [localStream, roomId]);

  return null; // UI 없음
};

export default AudioRecorder;

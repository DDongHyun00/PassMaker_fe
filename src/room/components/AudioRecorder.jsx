// src/components/AudioRecorder.jsx
import { useEffect } from "react";

const AudioRecorder = ({ localStream, roomId }) => {
  useEffect(() => {
    if (!localStream || !roomId) {
      console.warn("녹음 시작 안함: localStream 또는 roomId 없음");
      return;
    }

    const mimeType = "audio/webm";
    const audioTracks = localStream.getAudioTracks();

    if (!audioTracks || audioTracks.length === 0) {
      console.error("오디오 트랙이 없습니다. MediaRecorder 시작 안함");
      return;
    }

    if (!MediaRecorder.isTypeSupported(mimeType)) {
      console.error("브라우저가 audio/webm 형식을 지원하지 않습니다");
      return;
    }

    let mediaRecorder;
    const audioChunks = [];

    try {
      mediaRecorder = new MediaRecorder(localStream, { mimeType });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioFile = new File([audioBlob], "audio.webm", { type: "audio/webm" });

        const formData = new FormData();
        formData.append("audioFile", audioFile);
        formData.append("roomId", roomId);

        try {
          const res = await fetch("http://localhost:8080/api/stt/upload-audio", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            console.log("녹음 업로드 성공");
          } else {
            console.error("업로드 실패", await res.text());
          }
        } catch (err) {
          console.error("업로드 오류", err);
        }
      };

      mediaRecorder.start();
      console.log("MediaRecorder 시작됨");

      const stopTimer = setTimeout(() => {
        mediaRecorder.stop();
        console.log("MediaRecorder 자동 종료");
      }, 20 * 60 * 1000);

      return () => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
          console.log("컴포넌트 unmount → MediaRecorder 종료");
        }
        clearTimeout(stopTimer);
      };
    } catch (err) {
      console.error("MediaRecorder 시작 중 예외 발생", err);
    }
  }, [localStream, roomId]);


  return null; // UI 없음
};

export default AudioRecorder;

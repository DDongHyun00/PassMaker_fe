// src/components/AudioRecorder.jsx
import { useEffect, useRef } from "react";

const AudioRecorder = ({ localStream, roomId }) => {
  const hasStarted = useRef(false);

  useEffect(() => {
    // localStream 또는 roomId가 없거나 이미 시작된 경우 바로 리턴
    if (!localStream || !roomId || hasStarted.current) {
      return;
    }
    hasStarted.current = true;

    // 1) 지원 포맷 찾기
    const possible = [
      "audio/webm;codecs=opus",
      "audio/ogg;codecs=opus",
      "audio/webm",
      "audio/mpeg",
    ];
    const mimeType = possible.find((t) => MediaRecorder.isTypeSupported(t));
    if (!mimeType) {
      console.error("지원 가능한 포맷 없음:", possible);
      return;
    }
    console.log("녹음 포맷:", mimeType);

    // 2) 오디오 트랙만 추출
    const tracks = localStream.getAudioTracks();
    if (tracks.length === 0) {
      console.error("오디오 트랙 없음");
      return;
    }
    const audioStream = new MediaStream(tracks);

    // 3) MediaRecorder 생성
    const recorder = new MediaRecorder(audioStream, { mimeType });
    const chunks = [];
    let partIndex = 0;

    // 테스트용: 20초 간격 (운영 시에는 20 * 60 * 1000)
    const CHUNK_MS = 20 * 1000;

    recorder.ondataavailable = (e) => {
      console.log("🎙️ ondataavailable size=", e.data.size);
      if (e.data.size > 0) {
        chunks.push(e.data);

        // 즉시 파트 업로드
        const ext = mimeType.split("/")[1].split(";")[0];
        const file = new File(
          [e.data],
          `chunk${partIndex}.${ext}`,
          { type: mimeType }
        );
        const form = new FormData();
        form.append("roomId", roomId);
        form.append("partIndex", partIndex);
        form.append("audioFile", file);

        fetch("/api/stt/upload-audio", {
          method: "POST",
          body: form,
        })
          .then((res) => console.log(`✅ part ${partIndex} 업로드:`, res.status))
          .catch((err) => console.error(`❌ part ${partIndex} 업로드 오류`, err));

        partIndex++;
      }
    };

    recorder.onstop = () => {
      const total = chunks.reduce((sum, b) => sum + b.size, 0);
      console.log("🎙️ onstop: chunks=", chunks.length, "totalBytes=", total);
      if (total > 0) {
        const blob = new Blob(chunks, { type: mimeType });
        const ext = mimeType.split("/")[1].split(";")[0];
        const combined = new File(
          [blob],
          `audio.${ext}`,
          { type: mimeType }
        );
        const form = new FormData();
        form.append("roomId", roomId);
        form.append("partIndex", partIndex);
        form.append("audioFile", combined);

        fetch("/api/stt/upload-audio", {
          method: "POST",
          body: form,
        })
          .then((res) => console.log("📤 최종 업로드:", res.status))
          .catch((err) => console.error("📤 최종 업로드 오류", err));
      } else {
        console.warn("⚠️ onstop: 전송할 청크가 없습니다.");
      }
    };

    // 녹음 시작 (CHUNK_MS 간격으로 ondataavailable 트리거)
    recorder.start(CHUNK_MS);
    console.log(`MediaRecorder 시작 (chunk every ${CHUNK_MS} ms)`);

    // 언마운트 시 정리
    return () => {
      if (recorder.state !== "inactive") {
        recorder.stop();
        console.log("컴포넌트 언마운트 → MediaRecorder 종료");
      }
      audioStream.getTracks().forEach((t) => t.stop());
    };
  }, [localStream, roomId]);

  return null;
};

export default AudioRecorder;

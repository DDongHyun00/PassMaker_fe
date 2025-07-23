// src/components/AudioRecorder.jsx
import { useEffect, useRef } from "react";

const AudioRecorder = ({ localStream, roomId }) => {

  const hasStarted = useRef(false);

  useEffect(() => {
    if (!localStream || !roomId || hasStarted.current) return;

    const formats = [
      "audio/webm;codecs=opus",
      "audio/ogg;codecs=opus",
      "audio/webm",
      "audio/ogg",
    ];

    const mimeType = formats.find((type) => MediaRecorder.isTypeSupported(type));
    if (!mimeType) {
      console.error("❌ 지원 가능한 오디오 포맷 없음");
      return;
    }

    const audioTracks = localStream.getAudioTracks();
    if (audioTracks.length === 0) {
      console.error("❌ 오디오 트랙이 없습니다.");
      return;
    }

    const track = audioTracks[0];
    console.log("🎤 enabled:", track.enabled);
    console.log("🎤 muted:", track.muted);
    console.log("🎤 readyState:", track.readyState);

    if (!track.enabled) {
      console.warn("✅ 오디오 트랙 강제 활성화");
      track.enabled = true;
    }

    const audioStream = new MediaStream(audioTracks);
    const audioChunks = [];
    let mediaRecorder;

    try {
      mediaRecorder = new MediaRecorder(audioStream, { mimeType });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log("🛑 onstop 실행됨");
        console.log("audioChunks 길이:", audioChunks.length);

        const audioBlob = new Blob(audioChunks, { type: mimeType });
        console.log("Blob 크기:", audioBlob.size);

        const audioFile = new File([audioBlob], "audio.webm", { type: mimeType });
        const formData = new FormData();
        formData.append("audioFile", audioFile);
        formData.append("roomId", roomId);
        formData.append("partIndex", 0);

        try {
          const res = await fetch("http://localhost:8080/api/stt/upload-audio", {
            method: "POST",
            body: formData,
          });

          if (res.ok) {
            console.log("✅ 녹음 업로드 성공");
          } else {
            const errText = await res.text();
            console.error("❌ 업로드 실패:", res.status, errText);
          }
        } catch (err) {
          console.error("❌ 업로드 중 네트워크 오류:", err);
        }
      };


      mediaRecorder.start(1000);
      console.log("🎙️ MediaRecorder 시작됨:", mimeType);

      const stopTimer = setTimeout(() => {
        mediaRecorder.stop();
        console.log("MediaRecorder 자동 종료");
      }, 20 * 1000); // 20분

      return () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
          console.log("컴포넌트 언마운트 → MediaRecorder 종료");
        }
        clearTimeout(stopTimer);
      };
    } catch (err) {
      console.error("MediaRecorder 시작 중 예외 발생", err);
    }
  }, [localStream, roomId]);

  return null;

};



export default AudioRecorder;


// // src/components/AudioRecorder.jsx
// import { useEffect, useRef } from "react";
//
// const AudioRecorder = ({ localStream, roomId }) => {
//   const hasStarted = useRef(false);
//
//   useEffect(() => {
//     // localStream 또는 roomId가 없거나 이미 시작된 경우 바로 리턴
//     if (!localStream || !roomId || hasStarted.current) {
//       return;
//     }
//     hasStarted.current = true;
//
//     // 1) 지원 포맷 찾기
//     const possible = [
//       "audio/webm;codecs=opus",
//       "audio/ogg;codecs=opus",
//       "audio/webm",
//       "audio/mpeg",
//     ];
//     const mimeType = possible.find((t) => MediaRecorder.isTypeSupported(t));
//     if (!mimeType) {
//       console.error("지원 가능한 포맷 없음:", possible);
//       return;
//     }
//     console.log("녹음 포맷:", mimeType);
//
//     // 2) 오디오 트랙만 추출
//     const tracks = localStream.getAudioTracks();
//     if (tracks.length === 0) {
//       console.error("오디오 트랙 없음");
//       return;
//     }
//     const audioStream = new MediaStream(tracks);
//
//     // 3) MediaRecorder 생성
//     const recorder = new MediaRecorder(audioStream, { mimeType });
//     const chunks = [];
//     let partIndex = 0;
//
//     // 테스트용: 20초 간격 (운영 시에는 20 * 60 * 1000)
//     const CHUNK_MS = 20 * 1000;
//
//     recorder.ondataavailable = (e) => {
//       console.log("🎙️ ondataavailable size=", e.data.size);
//       if (e.data.size > 0) {
//         chunks.push(e.data);
//
//         // 즉시 파트 업로드
//         const ext = mimeType.split("/")[1].split(";")[0];
//         const file = new File(
//             [e.data],
//             `chunk${partIndex}.${ext}`,
//             { type: mimeType }
//         );
//         const form = new FormData();
//         form.append("roomId", roomId);
//         form.append("partIndex", partIndex);
//         form.append("audioFile", file);
//
//         fetch("/api/stt/upload-audio", {
//           method: "POST",
//           body: form,
//         })
//             .then((res) => console.log(`✅ part ${partIndex} 업로드:`, res.status))
//             .catch((err) => console.error(`❌ part ${partIndex} 업로드 오류`, err));
//
//         partIndex++;
//       }
//     };
//
//     recorder.onstop = () => {
//       const total = chunks.reduce((sum, b) => sum + b.size, 0);
//       console.log("🎙️ onstop: chunks=", chunks.length, "totalBytes=", total);
//       if (total > 0) {
//         const blob = new Blob(chunks, { type: mimeType });
//         const ext = mimeType.split("/")[1].split(";")[0];
//         const combined = new File(
//             [blob],
//             `audio.${ext}`,
//             { type: mimeType }
//         );
//         const form = new FormData();
//         form.append("roomId", roomId);
//         form.append("partIndex", partIndex);
//         form.append("audioFile", combined);
//
//         fetch("/api/stt/upload-audio", {
//           method: "POST",
//           body: form,
//         })
//             .then((res) => console.log("📤 최종 업로드:", res.status))
//             .catch((err) => console.error("📤 최종 업로드 오류", err));
//       } else {
//         console.warn("⚠️ onstop: 전송할 청크가 없습니다.");
//       }
//     };
//
//     // 녹음 시작 (CHUNK_MS 간격으로 ondataavailable 트리거)
//     recorder.start(CHUNK_MS);
//     console.log(`MediaRecorder 시작 (chunk every ${CHUNK_MS} ms)`);
//
//     // 언마운트 시 정리
//     return () => {
//       if (recorder.state !== "inactive") {
//         recorder.stop();
//         console.log("컴포넌트 언마운트 → MediaRecorder 종료");
//       }
//       audioStream.getTracks().forEach((t) => t.stop());
//     };
//   }, [localStream, roomId]);
//
//   return null;
// };
//
// export default AudioRecorder;

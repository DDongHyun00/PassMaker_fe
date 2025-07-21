import React, { useState, useEffect } from "react";
import { createInquiry } from "../lib/inquiryApi";

export default function ModalInquiryWrite({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("MENTORING");

  // ESC 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async () => {
    try {
      await createInquiry({
        inquiryTitle: title,
        inquiryContent: content,
        inquiryType: type,
      });
      alert("문의가 등록되었습니다.");
      onClose();
    } catch (err) {
      // console.error('[문의 등록 에러]', err.response?.data || err);
      // console.log('[🧪 선택된 유형]', type);
      alert("문의 등록 실패");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">문의하기</h2>

        <label className="block mb-2 text-sm font-medium">제목</label>
        <input
          type="text"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">내용</label>
        <textarea
          className="w-full border px-3 py-2 mb-4 rounded h-28 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">문의 유형</label>
        <select
          className="w-full border px-3 py-2 mb-4 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="MENTORING">멘토링 관련</option>
          <option value="PAYMENT">결제 관련</option>
          <option value="ACCOUNT">계정 관련</option>
          <option value="ETC">기타</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            작성하기
          </button>
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}

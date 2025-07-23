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
      <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl border border-primary/10 relative">
        <h2 className="text-2xl font-extrabold mb-6 text-primary text-center tracking-tight">
          문의하기
        </h2>
        <label className="block mb-2 text-base font-semibold text-primary">
          제목
        </label>
        <input
          type="text"
          className="w-full border border-primary/30 px-4 py-3 mb-4 rounded-xl text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block mb-2 text-base font-semibold text-primary">
          내용
        </label>
        <textarea
          className="w-full border border-primary/30 px-4 py-3 mb-4 rounded-xl h-32 resize-none text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label className="block mb-2 text-base font-semibold text-primary">
          문의 유형
        </label>
        <select
          className="w-full border border-primary/30 px-4 py-3 mb-6 rounded-xl text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="MENTORING">멘토링 관련</option>
          <option value="PAYMENT">결제 관련</option>
          <option value="ACCOUNT">계정 관련</option>
          <option value="ETC">기타</option>
        </select>
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="mypage-btn-outline px-6 py-2 text-base"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="mypage-btn px-6 py-2 text-base"
          >
            작성하기
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-400 hover:text-primary text-2xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
}

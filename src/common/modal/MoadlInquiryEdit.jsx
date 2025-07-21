import React, { useState } from "react";
import { updateInquiry } from "../lib/inquiryApi";

export default function ModalInquiryEdit({ inquiry, onClose, onUpdated }) {
  const [title, setTitle] = useState(inquiry.inquiryTitle);
  const [content, setContent] = useState(inquiry.inquiryContent);

  const handleUpdate = async () => {
    try {
      await updateInquiry(inquiry.id, {
        inquiryTitle: title,
        inquiryContent: content,
      });
      alert("수정 완료!");
      onUpdated(); // 상세 다시 보여주기
    } catch (err) {
      alert("수정 실패");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">문의 수정</h2>

        <label className="text-sm font-medium">제목</label>
        <input
          className="w-full border px-3 py-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-sm font-medium">내용</label>
        <textarea
          className="w-full border px-3 py-2 mb-4 rounded h-28 resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}

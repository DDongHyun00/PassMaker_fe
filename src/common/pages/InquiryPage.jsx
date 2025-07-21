import React, { useState } from "react";
import ModalInquiryWrite from "../modal/ModalInquiryWrite";
import ModalInquiryList from "../modal/ModalInquiryList";
import inquiry_svg from "../../assets/inquiry_svg.png";

export default function InquiryPage() {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white p-10 rounded-xl shadow-md text-center">
        {/* 이미지 */}
        <div className="flex justify-center mb-6">
          <img
            src={inquiry_svg}
            alt="문의 이미지"
            className="w-64 opacity-80"
          />
        </div>

        {/* 안내문구 */}
        <h2 className="text-3xl font-bold text-purple-700 mb-2">1:1 문의</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          궁금한 점이나 불편한 사항이 있으시면 언제든지 문의해주세요.
          <br />
          친절하게 안내해드릴게요!
        </p>

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setIsWriteOpen(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow transition-all"
          >
            문의하기
          </button>
          <button
            onClick={() => setIsListOpen(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 shadow transition-all"
          >
            문의 내역
          </button>
        </div>
      </div>

      {/* 모달 */}
      {isWriteOpen && (
        <ModalInquiryWrite onClose={() => setIsWriteOpen(false)} />
      )}
      {isListOpen && <ModalInquiryList onClose={() => setIsListOpen(false)} />}
    </div>
  );
}
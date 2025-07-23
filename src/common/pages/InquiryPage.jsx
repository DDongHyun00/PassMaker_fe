import React, { useState } from "react";
import ModalInquiryWrite from "../modal/ModalInquiryWrite";
import ModalInquiryList from "../modal/ModalInquiryList";
import inquiry_svg from "../../assets/inquiry_svg.png";

export default function InquiryPage() {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <div className="inquiry-bg min-h-screen flex items-center justify-center py-16 px-2">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 border border-primary/10 text-center flex flex-col items-center">
        <div className="flex justify-center mb-8">
          <img
            src={inquiry_svg}
            alt="문의 이미지"
            className="w-48 opacity-90 rounded-xl shadow"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-primary mb-3 tracking-tight">
          1:1 문의
        </h2>
        <p className="text-gray-500 mb-10 leading-relaxed text-lg">
          궁금한 점이나 불편한 사항이 있으시면 언제든지 문의해주세요.
          <br />
          친절하게 안내해드릴게요!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button
            onClick={() => setIsWriteOpen(true)}
            className="mypage-btn flex-1 py-3 text-lg"
          >
            문의하기
          </button>
          <button
            onClick={() => setIsListOpen(true)}
            className="mypage-btn-outline flex-1 py-3 text-lg"
          >
            문의 내역
          </button>
        </div>
      </div>
      {isWriteOpen && (
        <ModalInquiryWrite onClose={() => setIsWriteOpen(false)} />
      )}
      {isListOpen && <ModalInquiryList onClose={() => setIsListOpen(false)} />}
    </div>
  );
}

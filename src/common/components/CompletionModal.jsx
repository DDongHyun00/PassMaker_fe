import React from "react";

const CompletionModal = ({ message, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center border border-primary/10 max-w-xs w-full">
        <h2 className="text-2xl font-extrabold mb-6 text-primary tracking-tight">
          알림
        </h2>
        <p className="mb-8 text-lg text-gray-700">{message}</p>
        <button onClick={onConfirm} className="mypage-btn w-full py-3 text-lg">
          확인
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;

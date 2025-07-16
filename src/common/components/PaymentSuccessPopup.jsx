// src/components/PaymentSuccessPopup.jsx
import React from "react";

export default function PaymentSuccessPopup({ data, onClose }) {
  if (!data) return null;

  const {
    mentorNickname,
    menteeNickname,
    amount,
    approvedAt,
    reservationId,
    status,
    reservationStatus,
  } = data;

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] relative border-2 border-purple-500">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-purple-700">결제 성공</h2>
        <p className="text-gray-800">
          <strong>멘토:</strong> {mentorNickname}
        </p>
        <p className="text-gray-800">
          <strong>멘티:</strong> {menteeNickname}
        </p>
        <p className="text-gray-800">
          <strong>결제 금액:</strong> {amount.toLocaleString()}원
        </p>
        {/*<p className="text-gray-800">*/}
        {/*  <strong>예약 ID:</strong> {reservationId}*/}
        {/*</p>*/}
        <p className="text-gray-800">
          <strong>결제 상태:</strong> {status}
        </p>
        <p className="text-gray-800 mb-4">
          <strong>승인 시각:</strong> {formatDateTime(approvedAt)}
        </p>

        <button
          className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}

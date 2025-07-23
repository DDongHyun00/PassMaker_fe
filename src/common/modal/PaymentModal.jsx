// src/components/PaymentModal.jsx
import React from "react";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import axios from "../../common/lib/axios.js";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ reservation, onClose }) => {
  const navigate = useNavigate();

  const handleTossPayment = async () => {
    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
    const tossPayments = await loadTossPayments(clientKey);

    const orderId = `reserve_${mentorId}_${reservationTime}`; // ✅ reservationId 대신
    const amount = 66000; // TODO: mentor의 금액으로 대체 가능

    try {
      await tossPayments.requestPayment("카드", {
        amount,
        orderId,
        orderName: "멘토링 결제",
        customerName: "김민수", // TODO: 유저 정보로 대체 가능
        successUrl: `${window.location.origin}/mentor/${reservation.mentorId}?paySuccess=true&reservationId=${reservation.reserveId}&amount=${amount}`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err) {
      console.error("Toss 결제 오류:", err);
      alert("결제 진행 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm">
        <h3 className="mb-4 text-lg font-bold">Toss 결제를 진행합니다</h3>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded w-full"
          onClick={handleTossPayment}
        >
          결제하기
        </button>
        <button className="mt-2 text-sm text-gray-500 w-full" onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

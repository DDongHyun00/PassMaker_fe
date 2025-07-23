import React, { useState } from "react";
import axios from "../../common/lib/axios";

// ReservationStatus: 예약/결제 상태 표시 및 예약 취소 기능
const ReservationStatus = ({ reservation, payment, onCancel }) => {
  const [loading, setLoading] = useState(false);

  // 예약 취소 핸들러
  const handleCancel = async () => {
    if (!window.confirm("정말 예약을 취소하시겠습니까?")) return;
    setLoading(true);
    try {
      // 예약 취소 API 호출
      await axios.delete(`/reservations/${reservation.reserveId}/cancel`);
      // 성공 시 부모로 알림
      onCancel();
    } catch (err) {
      alert("취소 실패: " + err.response?.data?.message);
    }
    setLoading(false);
  };

  // 30분 전까지만 취소 가능 (예시)
  const canCancel = () => {
    const now = new Date();
    const reserveTime = new Date(reservation.reservationTime);
    return (reserveTime - now) / 1000 / 60 > 30;
  };

  return (
    <div className="border p-4 rounded my-4">
      <div>멘토: {reservation.mentorNickname}</div>
      <div>예약 시간: {reservation.reservationTime}</div>
      <div>상태: {reservation.status}</div>
      {payment && (
        <div>
          <div>결제 상태: {payment.status}</div>
          <div>결제 금액: {payment.amount}원</div>
        </div>
      )}
      {/* 30분 전까지만 취소 버튼 노출 */}
      {canCancel() && (
        <button
          className="mt-2 bg-gray-200 px-3 py-1 rounded"
          onClick={handleCancel}
          disabled={loading}
        >
          예약 취소
        </button>
      )}
    </div>
  );
};

export default ReservationStatus;

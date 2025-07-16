import React, { useState } from "react";
import axios from "../../common/lib/axios";

// ReservationForm: 멘토/시간 선택 후 예약 생성 API 호출 폼
const ReservationForm = ({ onSuccess }) => {
  // 멘토 선택 상태
  const [mentorId, setMentorId] = useState("");
  // 예약 시간 상태
  const [reservationTime, setReservationTime] = useState("");
  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // TODO: 실제 멘토 리스트 API 연동 필요 (여기선 예시)
  const mentors = [
    { id: 1, name: "김멘토" },
    { id: 2, name: "이멘토" },
  ];

  // 예약 생성 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 예약 생성 API 호출
      const res = await axios.post("/api/reservations", {
        mentorId: Number(mentorId),
        reservationTime,
      });
      // 성공 시 부모로 데이터 전달
      onSuccess(res.data);
    } catch (err) {
      alert("예약 실패: " + err.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 멘토 선택 */}
      <select
        value={mentorId}
        onChange={(e) => setMentorId(e.target.value)}
        required
      >
        <option value="">멘토 선택</option>
        {mentors.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      {/* 시간 선택 */}
      <input
        type="datetime-local"
        value={reservationTime}
        onChange={(e) => setReservationTime(e.target.value)}
        required
      />
      {/* 예약 버튼 */}
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        결제하기
      </button>
    </form>
  );
};

export default ReservationForm;

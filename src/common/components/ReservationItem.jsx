import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const ReservationItem = ({ reservation, onEnter, onCancel, isCompleted }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleReapplyClick = () => {
    navigate(`/mentors/${reservation.mentorNickname}`); // 멘토 상세 페이지로 이동
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded mb-2 ${isCompleted ? "bg-gray-200" : "bg-gray-100"}`}>
      <div>
        <div className="font-semibold">{reservation.mentorNickname}</div>
        <div className="text-sm text-gray-500">
          {dayjs(reservation.startedAt).format("YYYY-MM-DD HH:mm")} ~ {dayjs(reservation.endedAt).format("HH:mm")}
        </div>
        <div className={`text-sm font-semibold ${reservation.statusColor}`}>{reservation.statusLabel}</div>
      </div>
      <div className="flex gap-2">
        {isCompleted ? (
          <span className="text-gray-500 text-sm">완료됨</span>
        ) : reservation.status === "CANCELLED" ? (
          <button
            onClick={handleReapplyClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            다시 신청
          </button>
        ) : (
          <>
            <button
              onClick={() => onEnter(reservation)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              입장하기
            </button>
            <button
              onClick={() => onCancel(reservation)}
              className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-200"
            >
              신청 취소
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationItem;

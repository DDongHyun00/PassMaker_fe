import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ReservedMentoringPage = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const now = dayjs();

  useEffect(() => {
    axios
      .get("/api/reservations/enterable", { withCredentials: true })
      .then((res) => setReservations(res.data));
  }, []);

  const upcoming = reservations.filter((r) => dayjs(r.endedAt).isAfter(now));
  const completed = reservations.filter((r) => dayjs(r.endedAt).isBefore(now));

  const handleEnterClick = (reservation) => {
    setSelectedRoom(reservation);
    setCodeInput("");
    setShowModal(true);
  };

  const handleConfirmCode = async () => {
    if (!selectedRoom) return;

    const canEnter =
      now.isAfter(dayjs(selectedRoom.startedAt)) &&
      now.isBefore(dayjs(selectedRoom.endedAt));

    if (!canEnter) {
      alert("입장 가능한 시간이 아닙니다.");
      return;
    }

    try {
      const res = await axios.post(
        `/api/rooms/${selectedRoom.roomId}/enter`,
        { roomCode: codeInput },
        { withCredentials: true }
      );
      navigate(`/mentoringroom/${selectedRoom.roomId}`, {
        state: res.data,
      });
    } catch (e) {
      alert("입장 실패: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <h2 className="text-xl font-bold mb-4">예약된 멘토링</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {upcoming.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12 text-lg font-semibold">
            예약된 멘토링이 없습니다.
          </div>
        )}
        {upcoming.map((res) => (
          <div
            key={res.reservationId}
            className="bg-white/80 rounded-2xl shadow-xl border-2 border-primary/10 p-6 md:p-8 mb-2 max-w-md w-full mx-auto flex items-center justify-between transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex flex-col justify-center">
              <div className="font-semibold text-base text-primary mb-1">
                {res.mentorNickname}
              </div>
              <div className="text-sm text-gray-500">
                {dayjs(res.startedAt).format("YYYY-MM-DD HH:mm")} ~{" "}
                {dayjs(res.endedAt).format("HH:mm")}
              </div>
            </div>
            <button
              onClick={() => handleEnterClick(res)}
              className="mypage-btn w-20 py-1 text-sm rounded-md shadow-sm font-semibold transition-all"
            >
              입장하기
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">완료된 멘토링</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {completed.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12 text-lg font-semibold">
            완료된 멘토링이 없습니다.
          </div>
        )}
        {completed.map((res) => (
          <div
            key={res.reservationId}
            className="bg-white/80 rounded-2xl shadow-xl border-2 border-primary/10 p-6 md:p-8 mb-2 max-w-md w-full mx-auto flex items-center justify-between transition-all duration-200 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex flex-col justify-center">
              <div className="font-semibold text-base text-primary mb-1">
                {res.mentorNickname}
              </div>
              <div className="text-sm text-gray-500">
                {dayjs(res.startedAt).format("YYYY-MM-DD HH:mm")} ~{" "}
                {dayjs(res.endedAt).format("HH:mm")}
              </div>
            </div>
            <span className="text-gray-400 text-sm font-semibold">완료됨</span>
          </div>
        ))}
      </div>

      {/* 비밀코드 입력 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-bold mb-2">비밀코드 입력</h3>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="비밀코드를 입력하세요"
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleConfirmCode}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                입장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservedMentoringPage;

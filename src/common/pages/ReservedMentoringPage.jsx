import React, { useEffect, useState } from "react";
import axios from "../../common/lib/axios.js";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useAuth } from "../../auth/AuthContext";
import authApi from "../../common/lib/axios.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const ReservedMentoringPage = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const now = dayjs();
  const { user } = useAuth();
  const isMentor = user?.isMentor;



  useEffect(() => {
    axios
      .get("/reservations/enterable", { withCredentials: true })
      .then((res) => {
        console.log("예약 응답 전체:", res.data);
        setReservations(res.data)
      });
  }, []);

  const upcoming = reservations.filter((r) => {
    if (r.status === "WAITING") return true;
    if (r.endedAt) return dayjs(r.endedAt).isAfter(now);
    return false;
  });

  const completed = reservations.filter((r) => dayjs(r.endedAt).isBefore(now));

  const handleEnterClick = (reservation) => {
    setSelectedRoom(reservation);
    setCodeInput("");
    setShowModal(true);
  };

  const handleReject = async (reservationId) => {
    if (window.confirm("정말로 거절하시겠습니까?")) {
      try {
        await authApi.patch(
            `/reservations/${reservationId}/cancel`, // 백엔드에서 만든 API 경로
            {},
            { withCredentials: true }
        );

        // 상태만 "CANCELLED"로 변경해서 다시 그리기
        setReservations((prev) =>
            prev.map((r) =>
                r.reservationId === reservationId
                    ? { ...r, status: "CANCELLED" }
                    : r
            )
        );
      } catch (e) {
        alert("거절 실패: " + (e.response?.data?.message || e.message));
      }
    }
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
      const res = await authApi.post(
        `/rooms/${selectedRoom.roomId}/enter`,
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

  const handleApprove = async (reservationId) => {
    try {
      await authApi.patch(
        `/reservations/${reservationId}/approve`,
        {},
        { withCredentials: true }
      );
      // 상태 갱신: 예약 목록 재조회
      const res = await authApi.get("/reservations/enterable", {
        withCredentials: true,
      });
      console.log("멘토링 예약 응답:", res.data);
      setReservations(res.data);
    } catch (e) {
      alert("수락 실패: " + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-8 flex flex-col items-center">
      <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl p-6 md:p-12 my-8">
        <h1 className="text-3xl font-extrabold text-primary text-center mb-8">
          멘토링
        </h1>
        <div className="border-b border-gray-200 w-full mb-8" />
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
                  {res.startedAt && res.endedAt ? (
                      <>
                        {dayjs.utc(res.startedAt).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm")} ~{" "}
                        {dayjs.utc(res.endedAt).tz("Asia/Seoul").format("HH:mm")}
                      </>
                  ) : res.reservationTime ? (
                      <>
                        {dayjs(res.reservationTime).format("YYYY-MM-DD HH:mm")} (예약 시간)
                      </>
                  ) : (
                      <>예약 시간 미정</>
                  )}
                </div>

              </div>
              {/* 예약 상태별 버튼/표시 */}
              {isMentor && res.status?.toUpperCase() === "WAITING" ? (
                  <div className="flex gap-2">
                    <button
                        onClick={() => handleApprove(res.reservationId)}
                        className="mypage-btn w-20 py-1 text-sm rounded-md shadow-sm font-semibold transition-all"
                    >
                      수락
                    </button>
                    <button
                        onClick={() => handleReject(res.reservationId)}
                        className="mypage-btn w-20 py-1 text-sm rounded-md shadow-sm font-semibold transition-all bg-gray-200 text-red-500 border border-red-300 hover:bg-red-100"
                    >
                      거절
                    </button>
                  </div>
              ) : res.status === "ACCEPT" ? (
                  <button
                      onClick={() => handleEnterClick(res)}
                      className="mypage-btn w-20 py-1 text-sm rounded-md shadow-sm font-semibold transition-all"
                  >
                    입장하기
                  </button>
              ) : res.status === "CANCELLED" ? (
                  <span className="text-gray-400 font-semibold">취소됨</span>
              ) : res.status === "REJECT" ? (
                  <span className="text-red-500 font-semibold">거절됨</span>
              ) : null}


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
              <span className="text-gray-400 text-sm font-semibold">
                완료됨
              </span>
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
    </div>
  );
};

export default ReservedMentoringPage;

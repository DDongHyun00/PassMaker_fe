// src/pages/MainPage.jsx
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import RoomEntryBox from "../components/RoomEntryBox";
import { useAuth } from "../../auth/AuthContext";
import React, { useEffect, useState } from "react";
import MentorList from "../../mentor/components/MentorList";
import axios from "axios"; // ✅ 추가

export default function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleMyPage = () => navigate("/mypage");

  // ✅ 임시 멘토 수락/거절 테스트 관련 상태
  const [userRole, setUserRole] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [actionResult, setActionResult] = useState("");

  useEffect(() => {
    // ✅ 현재 로그인한 사용자의 역할 확인
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUserRole(res.data.role); // "MENTOR" expected
      } catch (err) {
        console.error("사용자 정보 조회 실패", err);
      }
    };
    fetchUserRole();
  }, []);

  const handleAction = async (action) => {
    try {
      await axios.patch(
        `/api/reservations/${reservationId}/action`,
        { action: action },
        { withCredentials: true }
      );
      setActionResult(`예약 ${reservationId} ${action} 완료`);
    } catch (err) {
      setActionResult(`오류: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="main-bg min-h-screen flex flex-col">
      {/* 헤더 */}
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col items-center py-10 px-2">
        {/* 멘토링방 입장 */}
        <section className="main-section w-full max-w-3xl mb-10 p-8 rounded-3xl shadow-xl bg-white flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
            멘토링방 입장하기
          </h1>
          <RoomEntryBox />
        </section>

        {/* 멘토 리스트 */}
        <section className="main-section w-full max-w-5xl mb-10 p-8 rounded-3xl shadow-xl bg-white">
          <h2 className="text-2xl font-bold text-primary mb-6">
            직무별 멘토 찾기
          </h2>
          <MentorList />
        </section>

        {/* 임시 멘토 수락/거절 테스트 */}
        {userRole === "MENTOR" && (
          <section className="main-section w-full max-w-2xl mb-10 p-8 rounded-3xl shadow-xl bg-white">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">
              🧪 멘토 수락/거절 테스트 (임시)
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              ※ 추후 마이페이지에서 관리 예정
            </p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="예약 ID 입력"
                value={reservationId}
                onChange={(e) => setReservationId(e.target.value)}
                className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary outline-none flex-1"
              />
              <button
                onClick={() => handleAction("ACCEPT")}
                className="mypage-btn flex-1"
              >
                수락
              </button>
              <button
                onClick={() => handleAction("REJECT")}
                className="mypage-btn-outline flex-1"
              >
                거절
              </button>
            </div>
            {actionResult && (
              <p className="mt-2 text-sm text-primary">{actionResult}</p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

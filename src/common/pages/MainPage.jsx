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
    <div className="min-h-screen flex flex-col">
      {/* 헤더 추가 */}
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <Header />

      {/* ─── 메인 컨텐츠 ─── */}
      <main className="flex-1 bg-gray-50 p-4">
        {/* 🔹 멘토링방 입장 컴포넌트 */}
        <RoomEntryBox />

        {/* 🔹 멘토 리스트 */}
        <MentorList />


        {/* ✅ [임시] 멘토 수락/거절 테스트 영역 */}
        {userRole === "MENTOR" && (
          <div className="mt-8 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold mb-2">🧪 멘토 수락/거절 테스트 (임시)</h2>
            <p className="text-sm text-gray-600 mb-2">※ 추후 마이페이지에서 관리 예정</p>
            <input
              type="text"
              placeholder="예약 ID 입력"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              className="border px-2 py-1 mr-2"
            />
            <button
              onClick={() => handleAction("ACCEPT")}
              className="bg-green-500 text-white px-3 py-1 rounded mr-2"
            >
              수락
            </button>
            <button
              onClick={() => handleAction("REJECT")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              거절
            </button>
            {actionResult && <p className="mt-2 text-sm">{actionResult}</p>}
          </div>
        )}
      </main>
    </div>
  );
}

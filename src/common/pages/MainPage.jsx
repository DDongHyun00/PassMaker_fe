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
      <main className="flex-1 flex flex-col items-center py-0 px-0 w-full bg-gray-50">
        {/* 상단 배너 */}
        <section className="w-full flex justify-center items-center bg-transparent mt-8 mb-12 md:mb-20">
          <div className="w-full max-w-none px-0 md:px-0 xl:px-0 relative overflow-hidden bg-gradient-to-r from-green-100 via-cyan-100 to-blue-200 shadow py-8 md:py-12 flex flex-col items-center">
            {/* 배경 장식 요소들 */}
            <div className="absolute top-6 left-10 w-32 h-32 bg-cyan-200/40 rounded-full blur-2xl z-0"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl z-0"></div>
            <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-green-200/40 rounded-full blur-xl z-0"></div>
            <div className="absolute bottom-0 right-1/3 w-28 h-28 bg-cyan-100/50 rounded-full blur-xl z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/10 rounded-full blur-3xl z-0"></div>
            {/* 메인 텍스트 */}
            <div className="relative z-10 flex flex-col items-center">
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-4 drop-shadow-lg">
                당신의 다음 관문을 함께 만드는 사람들
              </h1>
              <p className="text-base md:text-xl text-gray-700 font-medium text-center mb-10 max-w-2xl">
                멘토링은 실무 경험이 풍부한 멘토와의 만남을 통해 실전 노하우,
                커리어 방향, 네트
                <br />
                워킹 등 다양한 기회를 얻을 수 있습니다. 나만의 성장 로드맵을
                만들고, 시행착오를 줄이며, 목표에 더 빨리 도달할 수 있도록
                도와줍니다.
              </p>
              {/* 버튼 영역 */}
              <div className="flex gap-6 mt-2">
                <button className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150">
                  멘토 신청
                </button>
                <button className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150">
                  멘토링방 입장하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 멘토 리스트 */}
        <section className="w-full bg-transparent">
          <div className="max-w-screen-2xl mx-auto px-2 md:px-8 xl:px-12">
            <MentorList />
          </div>
        </section>

        {/* 임시 멘토 수락/거절 테스트 */}
        {userRole === "MENTOR" && (
          <section className="w-full bg-transparent">
            <div className="max-w-4xl mx-auto px-2 md:px-8 xl:px-16">
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
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// src/pages/MainPage.jsx
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import RoomEntryBox from "../components/RoomEntryBox";
import { useAuth } from "../../auth/AuthContext";
import React, { useState, useEffect } from "react";
import MentorList from "../../mentor/components/MentorList";
import axios from "axios";
import inquiry from "../../assets/inquiry_svg.png";
import main_banner_1 from "../../assets/main_banner_1.png";
import main_banner_2 from "../../assets/main_banner_2.png";
import main_banner_3 from "../../assets/main_banner_3.png";

export default function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleMyPage = () => navigate("/mypage");

  // ✅ 임시 멘토 수락/거절 테스트 관련 상태
  const [userRole, setUserRole] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [actionResult, setActionResult] = useState("");

  // 배너 슬라이드 이미지
  const bgImages = [main_banner_1, main_banner_2, main_banner_3];
  const [bgIdx, setBgIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // ✅ 현재 로그인한 사용자의 역할 확인
    const fetchUserRole = async () => {
      try {
        const res = await axios.get("/auth/me", { withCredentials: true });
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
        `/reservations/${reservationId}/action`,
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
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-[1400px] bg-white rounded-2xl shadow-xl p-6 md:p-12 my-8">
          <main className="flex flex-col items-center py-0 px-0 w-full bg-transparent">
            {/* 상단 배너 */}
            <section className="w-full flex justify-center items-center bg-transparent mt-8 mb-12 md:mb-20">
              <div
                className="w-full max-w-screen-xl mx-auto px-0 md:px-0 xl:px-0 relative overflow-hidden shadow py-8 md:py-12 flex flex-col items-center rounded-xl border border-black/10"
                style={{ minHeight: "320px" }}
              >
                {/* 슬라이딩 배경 이미지 */}
                {bgImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="배경"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${i === bgIdx ? "opacity-40 opacity-100" : "opacity-0"} pointer-events-none`}
                    style={{ zIndex: 0, opacity: i === bgIdx ? 0.2 : 0 }}
                  />
                ))}
                {/* 오버레이 */}
                <div className="absolute inset-0 bg-white/60 z-10 pointer-events-none"></div>
                {/* 메인 텍스트/버튼 (z-20) */}
                <div className="relative z-20 flex flex-col items-center">
                  <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center mb-4 drop-shadow-lg">
                    당신의 다음 관문을 함께 만드는 사람들
                  </h1>
                  <p className="text-base md:text-xl text-gray-700 font-medium text-center mb-10 max-w-2xl">
                    멘토링은 실무 경험이 풍부한 멘토와의 만남을 통해 실전
                    노하우, 커리어 방향, 네트
                    <br />
                    워킹 등 다양한 기회를 얻을 수 있습니다. 나만의 성장 로드맵을
                    만들고, 시행착오를 줄이며, 목표에 더 빨리 도달할 수 있도록
                    도와줍니다.
                  </p>
                  {/* 버튼 영역 */}
                  <div className="flex gap-6 mt-2">
                    <button
                        className="px-8 py-3 bg-white text-primary font-semibold border-2 border-primary rounded-md shadow-md hover:bg-primary hover:text-black transition-all duration-150"
                        onClick={() => {
                          if (!user) {
                            navigate("/login");
                          } else if (!user.isMentor) {
                            navigate("/mentor/apply");
                          } else {
                            alert("이미 멘토입니다.");
                          }
                        }}
                    >
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
      </div>
    </div>
  );
}

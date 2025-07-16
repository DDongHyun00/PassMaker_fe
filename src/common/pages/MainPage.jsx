// src/pages/MainPage.jsx
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import RoomEntryBox from "../components/RoomEntryBox";
import { useAuth } from "../../auth/AuthContext";
import React, { useEffect, useState } from "react";
import MentorList from "../../mentor/components/MentorList";



export default function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleMyPage = () => navigate("/mypage");

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

        {/* 🔹 테스트용 버튼 */}
        <Link to="/mentors/1">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            멘토 상세 테스트
          </button>
        </Link>
      </main>
    </div>
  );
}

// src/pages/MainPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // react-router v6 기준
import MentorList from '../components/MentorList';

export default function MainPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleLogout = () => {
    // 로그아웃 로직 (토큰 삭제 등)
    setIsLoggedIn(false);
  };
  const handleMyPage = () => navigate('/mypage');

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── 메인 컨텐츠 ─── */}
      <main className="flex-1 bg-gray-50">
        <MentorList />
      </main>
    </div>
  );
}

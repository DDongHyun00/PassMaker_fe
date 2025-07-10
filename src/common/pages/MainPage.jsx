// src/pages/MainPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // react-router v6 기준
import MentorList from '../components/MentorList';
import Header from '../components/Header';
import { useAuth } from '../../auth/AuthContext';

export default function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleMyPage = () => navigate('/mypage');


  return (
    <div className="min-h-screen flex flex-col">
      {/* 헤더 추가 */}
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      {/* ─── 메인 컨텐츠 ─── */}
      <main className="flex-1 bg-gray-50">
        <MentorList />
      </main>
    </div>
  );
}

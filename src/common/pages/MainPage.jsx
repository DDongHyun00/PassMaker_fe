// src/pages/MainPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // react-router v6 기준
import MentorList from "../../mentor/components/MentorList";
import Header from '../components/Header';
import { useAuth } from '../../auth/AuthContext';
import RoomEntryBox from '../components/RoomEntryBox';

export default function MainPage() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');
  const handleMyPage = () => navigate('/mypage');


    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* 헤더 추가 */}
            <Header />

            {/* ─── 메인 컨텐츠 ─── */}
            <main className="flex-1 p-4 lg:p-6">
                <div className="max-w-7xl mx-auto">
                {/* 멘토링방 입장 컴포넌트 */}
                <RoomEntryBox />
                <div className="mt-6">
                {/* 멘토 리스트 */}
                <MentorList />
                </div>
                </div>
            </main>
        </div>
    );
}

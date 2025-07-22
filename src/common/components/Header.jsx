import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext.jsx";
import passmakerLogo from "../../assets/passmaker-pavicon.svg";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  if (loading) return null; // 로딩 중일 땐 비워두기

  return (
    <header className="fixed top-0 left-0 right-0 h-14 md:h-16 px-4 md:px-8 bg-white/80 backdrop-blur border-b border-gray-200 flex items-center justify-between z-50">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={passmakerLogo} alt="PassMaker Logo" className="w-8 h-8" />
        <span className="text-xl font-extrabold tracking-tight text-gray-900">
          PassMaker
        </span>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={logout}
              className="nav-btn-sub px-7 py-1 text-base rounded-md shadow-md border border-primary/30 font-semibold transition-all duration-150"
            >
              로그아웃
            </button>
            <button
              onClick={() => navigate("/mypage")}
              className="nav-btn-sub px-7 py-1 text-base rounded-md shadow-md border border-primary/30 font-semibold transition-all duration-150"
            >
              마이페이지
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login-select")}
              className="nav-btn-sub px-7 py-1 text-base rounded-md shadow-md border border-primary/30 font-semibold transition-all duration-150"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="nav-btn-main px-7 py-1 text-base rounded-md shadow-md border border-primary/30 font-semibold transition-all duration-150"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}

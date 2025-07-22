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
    <header className="header-bg fixed top-0 left-0 right-0 h-20 px-10 bg-white shadow-xl flex justify-between items-center z-[100] border-b border-primary/10">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary/20 shadow-lg flex items-center justify-center mr-2">
          <img src={passmakerLogo} alt="PassMaker Logo" className="w-8 h-8" />
        </div>
        <span className="text-2xl font-extrabold text-primary tracking-tight drop-shadow">
          PassMaker
        </span>
      </div>
      <div className="flex space-x-4">
        {user ? (
          <>
            <button
              onClick={logout}
              className="nav-btn-sub px-7 py-2 text-base"
            >
              로그아웃
            </button>
            <button
              onClick={() => navigate("/mypage")}
              className="nav-btn-main px-7 py-2 text-base"
            >
              마이페이지
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login-select")}
              className="nav-btn-sub px-7 py-2 text-base"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="nav-btn-main px-7 py-2 text-base"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </header>
  );
}

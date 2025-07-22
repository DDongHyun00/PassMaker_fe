// TitlePage.jsx
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CenterWrapper from "../styles/CenterWrapper.jsx";
import logo from "../../assets/PassMakerLogo.webp";
import AuthModal from "../modal/AuthModal.jsx";

const LoginSelectPage = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleKakaoLogin = () => {
    // 백엔드 카카오 OAuth 시작 URL로 리디렉트
    window.location.href = "/oauth/kakao";
  };

  const handleGoogleLogin = () => {
    // 백엔드 카카오 OAuth 시작 URL로 리디렉트
    window.location.href = "/oauth/google";
  };

  return (
    <div className="loginselect-bg min-h-screen flex items-center justify-center py-16 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-primary/10 flex flex-col items-center">
        <img
          src={logo}
          alt="PassMakerLogo"
          className="mx-auto w-32 mb-6 rounded-xl shadow"
        />
        <h1 className="text-3xl font-extrabold mb-2 text-primary tracking-tight">
          PassMaker
        </h1>
        <p className="mb-8 text-gray-500 text-lg">환영합니다!</p>
        <div className="flex gap-4 w-full mb-6">
          <button
            onClick={() => navigate("/signup")}
            className="mypage-btn flex-1 py-3 text-lg"
          >
            회원가입
          </button>
          <button
            onClick={() => navigate("/login")}
            className="mypage-btn-outline flex-1 py-3 text-lg"
          >
            로그인
          </button>
        </div>
        <div className="text-gray-400 text-sm mb-4 w-full text-center">
          또는
        </div>
        <div className="w-full mb-3">
          <button
            onClick={handleKakaoLogin}
            className="w-full h-12 rounded-xl font-bold text-lg bg-yellow-400 text-gray-900 flex items-center justify-center gap-2 shadow hover:bg-yellow-300 transition"
          >
            <span className="inline-block w-6 h-6 bg-[url('/src/assets/kakao_Login_Button.png')] bg-contain bg-no-repeat" />
            카카오 로그인
          </button>
        </div>
        <div className="w-full mb-3">
          <button
            onClick={handleGoogleLogin}
            className="relative w-full h-12 rounded-xl font-bold text-lg bg-white text-black flex items-center justify-center gap-2 border border-gray-200 shadow hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-6 h-6"
            />
            구글 로그인
          </button>
        </div>
        <button
          onClick={() => setShowAuthModal(true)}
          className="mt-2 text-sm underline text-primary hover:text-primary-dark"
        >
          이메일 / 비밀번호 찾기
        </button>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default LoginSelectPage;

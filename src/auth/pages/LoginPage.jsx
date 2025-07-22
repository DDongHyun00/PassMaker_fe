// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../common/lib/axios.js";
import CenterWrapper from "../../common/styles/CenterWrapper.jsx";
import { useAuth } from "../AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log("로그인 시도 중..."); // 유지 가능 (디버깅용)

    try {
      // 1. 로그인 요청 (AccessToken/RefreshToken은 HttpOnly 쿠키로 저장됨)
      const response = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      console.log("로그인 성공 응답:", response);

      // 2. 로그인 후 사용자 정보 로드 및 상태 반영
      await login(); // AuthContext → /auth/me 호출됨

      console.log("AuthContext login 함수 호출됨");
      if (user?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("로그인 실패:", err);
      const msg = err?.response?.data?.message;
      if (msg?.includes("탈퇴한 회원")) {
        setError("탈퇴한 회원입니다. 관리자에게 문의하세요.");
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    }
  };

  return (
    <div className="login-bg min-h-screen flex items-center justify-center py-16 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-primary/10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-primary tracking-tight">
          로그인
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            className="border border-primary/30 p-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="border border-primary/30 p-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          />
          <button type="submit" className="mypage-btn w-full py-3 text-lg mt-2">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

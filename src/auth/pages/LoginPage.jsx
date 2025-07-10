// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../common/lib/axios.js";
import CenterWrapper from "../../common/styles/CenterWrapper.jsx";
import { useAuth } from "../AuthContext.jsx";


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

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

    console.log("로그인 시도 중..."); // 추가
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form); // JWT 쿠키 자동 저장됨
      console.log("로그인 성공 응답:", response); // 추가
      console.log("로그인 성공:", response.data);
      console.log("AuthContext login 함수 호출됨"); // 추가
      localStorage.setItem('isLoggedIn', 'true');
      console.log("localStorage.isLoggedIn 값: ", localStorage.getItem("isLoggedIn")); // 추가 확인
      login(); // Use the login function from AuthContext
      navigate("/"); // 메인 페이지로 이동

    } catch (err) {
      console.error("로그인 실패:", err);
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <CenterWrapper>
      <div className="p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded text-black"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded text-black"
          />
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            로그인
          </button>
        </form>
      </div>
    </CenterWrapper>
  );
};

export default LoginPage;

import React, { useState } from "react";
import axios from "../../common/lib/axios.js";
import { useNavigate } from "react-router-dom";
import CenterWrapper from "../../common/styles/CenterWrapper.jsx";

// 컴포넌트 정의
const SignupPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // useState 훅을 이용해 입력폼 상태 관리
  // form이라는 객체에 name, email, password 필드를 저장함
  const [form, setForm] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState(null); //에러 메시지 상태

  // 인풋이 변경될 때마다 form 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출시 axios로 회원가입 요청
  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지
    setError(null); // 기존 에러 초기화

    // 프론트에서 공백 필드 검증
    for (const key in form) {
      if (!form[key].trim()) {
        setError("모든 항목을 입력해주세요.");
        return;
      }
    }

    try {
      // axios 요청
      const response = await axios.post("/auth/signup", form, {
        withCredentials: true,
      });
      console.log("회원가입 성공:", response.data);
      // 성공 시 로그인 페이지로 이동
      navigate("/login");
    } catch (err) {
      console.log("회원가입 실패:", err);
      console.log("서버 응답 데이터:", err.response.data);
      setError("회원가입에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  // 폼 제출시 콘솔에 현재 입력된 값 출력
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // 새로고침 방지
  //   console.log("회원가입 입력값:", form);
  // };

  // 실제 화면 렌더링
  return (
    <div className="signup-bg min-h-screen flex items-center justify-center py-16 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-primary/10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-primary tracking-tight">
          회원가입
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
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
          <input
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            className="border border-primary/30 p-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          />
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
            className="border border-primary/30 p-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          />
          <input
            name="phone"
            type="tel"
            placeholder="전화번호"
            value={form.phone}
            onChange={handleChange}
            className="border border-primary/30 p-3 rounded-xl text-black text-lg focus:ring-2 focus:ring-primary outline-none bg-primary/5 placeholder:text-primary/40"
          />
          <button type="submit" className="mypage-btn w-full py-3 text-lg mt-2">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

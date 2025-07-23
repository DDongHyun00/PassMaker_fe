// src/components/AuthModal.jsx
import React, { useState } from "react";
import axios from "axios";

const AuthModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("email"); // "email" 또는 "password"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const resetFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setResult("");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    resetFields();
  };

  const handleFindEmail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/find-email", {
        name,
        phone,
      });
      setResult(`등록된 이메일: ${res.data.email}`);
    } catch (err) {
      setResult("일치하는 이메일이 없습니다.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/reset-password", {
        email,
        phone,
      });
      setResult(res.data.message);
    } catch (err) {
      setResult("일치하는 사용자가 없습니다.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[340px]">
        {/* 탭 버튼 */}
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "email"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("email")}
          >
            이메일 찾기
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              activeTab === "password"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => handleTabClick("password")}
          >
            비밀번호 재설정
          </button>
        </div>

        {/* 탭 내용 */}
        {activeTab === "email" ? (
          <form onSubmit={handleFindEmail}>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-2 p-2 border"
              required
            />
            <input
              type="text"
              placeholder="전화번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-2 p-2 border"
              required
            />
            <button className="w-full bg-blue-600 text-white p-2 rounded mt-1">
              이메일 찾기
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-2 p-2 border"
              required
            />
            <input
              type="text"
              placeholder="전화번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-2 p-2 border"
              required
            />
            <button className="w-full bg-blue-600 text-white p-2 rounded mt-1">
              임시 비밀번호 전송
            </button>
          </form>
        )}

        {/* 결과 메시지 */}
        {result && (
          <p className="mt-3 text-center text-sm text-green-600">{result}</p>
        )}

        {/* 닫기 */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 underline w-full"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AuthModal;

// src/components/FindEmailModal.jsx
import React, { useState } from "react";
import axios from "../../common/lib/axios.js";
import authApi from "../../common/lib/axios.js";

const FindEmailModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [resultEmail, setResultEmail] = useState("");

  const handleFindEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/user/find-email", {
        name,
        phone,
      });
      setResultEmail(response.data.email); // ← 백엔드 응답 형식에 맞춰 조정
    } catch (error) {
      alert("해당 정보로 등록된 이메일이 없습니다.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[320px]">
        <h2 className="text-lg font-bold mb-4">이메일 찾기</h2>
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
          <button
            className="w-full bg-blue-600 text-white p-2 rounded mt-2"
            type="submit"
          >
            이메일 찾기
          </button>
        </form>

        {resultEmail && (
          <div className="mt-4 text-sm text-center text-green-600">
            등록된 이메일: <strong>{resultEmail}</strong>
          </div>
        )}

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

export default FindEmailModal;

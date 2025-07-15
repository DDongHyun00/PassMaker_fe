// src/components/ResetPasswordModal.jsx
import React, { useState } from "react";
import axios from "axios";

const ResetPasswordModal = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [resultMessage, setResultMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/user/reset-password", {
                email,
                phone,
            });
            setResultMessage(response.data.message); // ← 백엔드 응답 형식에 맞춰 조정
        } catch (error) {
            alert("입력한 정보와 일치하는 사용자가 없습니다.");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[320px]">
                <h2 className="text-lg font-bold mb-4">비밀번호 재설정</h2>
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
                    <button className="w-full bg-blue-600 text-white p-2 rounded mt-2" type="submit">
                        임시 비밀번호 전송
                    </button>
                </form>

                {resultMessage && (
                    <div className="mt-4 text-sm text-center text-green-600">{resultMessage}</div>
                )}

                <button onClick={onClose} className="mt-4 text-sm text-gray-500 underline w-full">
                    닫기
                </button>
            </div>
        </div>
    );
};

export default ResetPasswordModal;

import React, { useState } from "react";
import MyPageButton from "../components/MyPageButton.jsx";
import authApi from "../lib/axios.js";

const WithdrawConfirmModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState("");

  const handleWithdraw = async () => {
    if (!password.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      await authApi.delete("/api/users/delete", {
        data: { password }, // 백엔드에서 @RequestBody PasswordDto 로 받을 수 있게 해야 함
      });
      alert("회원 탈퇴가 완료되었습니다.");
      onSuccess(); // 로그아웃 후 이동
    } catch (err) {
      console.error("탈퇴 실패", err);
      alert("비밀번호가 올바르지 않거나 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">회원 탈퇴 확인</h3>
      <p className="mb-2 text-sm text-gray-600">
        탈퇴를 진행하려면 비밀번호를 한 번 더 입력해주세요.
      </p>
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border w-full px-3 py-2 rounded mb-4"
      />
      <div className="flex gap-2 justify-end mt-4">
        <MyPageButton
          onClick={handleWithdraw}
          className="mypage-btn w-24 py-2 text-base rounded-md shadow-sm font-semibold transition-all"
        >
          탈퇴하기
        </MyPageButton>
        <MyPageButton
          onClick={onClose}
          className="mypage-btn-outline w-24 py-2 text-base rounded-md shadow-sm font-semibold transition-all"
        >
          취소
        </MyPageButton>
      </div>
    </div>
  );
};

export default WithdrawConfirmModal;

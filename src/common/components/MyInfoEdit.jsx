import React from "react";
import MyPageButton from "../components/MyPageButton.jsx";

const MyInfoEdit = ({ formData, onChange, onFileChange, onSave, onCancel }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">내 정보 수정</h3>
      <div className="mb-2">
        <label>닉네임:</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={onChange}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="mb-2">
        <label>전화번호:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label>썸네일:</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={onFileChange}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label>비밀번호:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="비밀번호는 보이지 않습니다."
          onChange={onChange}
          className="border rounded w-full px-2 py-1"
        />
      </div>
      <div className="flex gap-2">
        <MyPageButton onClick={onSave}>저장</MyPageButton>
        <MyPageButton onClick={onCancel}>취소</MyPageButton>
      </div>
    </div>
  );
};

export default MyInfoEdit;

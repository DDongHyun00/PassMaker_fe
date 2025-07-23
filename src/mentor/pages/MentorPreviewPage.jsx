import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../common/lib/axios.js";
import authApi from "../../common/lib/axios.js";

const MentorPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = location.state || {}; // MentorSettingsPage에서 전달받은 settings

   

  if (!settings) {
    // settings 데이터가 없으면 이전 페이지로 리다이렉트 또는 에러 처리
    return <div className="text-center p-10 text-red-500">미리보기 데이터를 찾을 수 없습니다.</div>;
  }

  const handleConfirmSave = async () => {
    try {
      await authApi.put('/mentors/me/edit-profile', settings);
      alert("설정이 성공적으로 저장되었습니다.");
      navigate('/mypage'); // 저장 성공 후 마이페이지로 이동
    } catch (err) {
      console.error("멘토 설정 저장 실패:", err);
      alert("설정 저장에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate('/mypage'); // 취소 시 마이 페이지로 돌아가기
  };

  const handleReturn = () => {
    navigate('/mentor/settings')
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">멘토링 설정 미리보기</h1>
      <p className="text-lg text-gray-700">아래 내용으로 멘토링 설정이 업데이트됩니다. 확인 후 저장해주세요.</p>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">기본 정보</h2>
        {settings.thumbnail && (
          <div className="mb-4">
            <strong>썸네일</strong>
            <img src={settings.thumbnail} alt="썸네일 이미지" className="w-24 h-24 object-cover rounded-full mt-2" />
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">멘토링 정보</h2>
        <p><strong>소개</strong> {settings.intro || 'N/A'}</p>
        <p><strong>멘토링 제목</strong> {settings.mentoringTitle || 'N/A'}</p>
        <p><strong>시간당 요금</strong> {settings.hourlyRate ? `${settings.hourlyRate.toLocaleString()}원` : 'N/A'}</p>
      </div>

      {settings.fields && settings.fields.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">전문 분야</h2>
          <ul className="list-disc list-inside">
            {settings.fields.map((field, index) => (
              <li key={index}>{field.fieldName}</li>
            ))}
          </ul>
        </div>
      )}

      {settings.careers && settings.careers.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">경력</h2>
          <ul className="list-disc list-inside">
            {settings.careers.map((career, index) => (
              <li key={index}>
                {career.company} ({career.period})
              </li>
            ))}
          </ul>
        </div>
      )}

      {settings.availableTimes && settings.availableTimes.length > 0 && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">가능 시간</h2>
          <ul className="list-disc list-inside">
            {settings.availableTimes.map((time, index) => (
              <li key={index}>
                {time.dayOfWeek}: {time.startTime} ~ {time.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end mt-10 space-x-4">
        <button
          onClick={handleCancel}
          className="bg-red-400 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          취소
        </button>
        <button
          onClick={handleReturn}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          다시 수정
        </button>
        <button
          onClick={handleConfirmSave}
          className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          확인 및 저장
        </button>
      </div>
    </div>
  );
};

export default MentorPreviewPage;

import React, { useState } from 'react';
import axios from "../../common/lib/axios.js";
import authApi from "../../common/lib/axios.js";

const MentorApplicationForm = ({ onClose }) => {
  const [intro, setIntro] = useState('');
  const [mentoringTitle, setMentoringTitle] = useState('');
  const [field, setField] = useState('');
  // [수정] career 대신 company와 period 상태 관리
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [cert, setCert] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // [수정] careers를 CareerDto 배열 형태로 구성
    const careers = [{ company, period }]; // 현재는 단일 경력만 입력받으므로 배열로 감쌈

    const applicationData = {
      intro,
      mentoringTitle,
      field,
      careers, // [수정] careers 배열 전송
      cert,
    };

    try {
      const response = await authApi.post(
        `/mentor-applications`,
        applicationData,
        { withCredentials: true }
      );
      console.log("멘토 지원서 제출 성공:", response.data);
      alert("멘토 지원서가 성공적으로 제출되었습니다.");
      onClose();
    } catch (error) {
      console.error("멘토 지원서 제출 실패:", error.response ? error.response.data : error.message);
      alert(`멘토 지원서 제출 실패: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">멘토 지원서 작성</h2>
      
      {/* 멘토링 제목 */}
      <div className="mb-4">
        <label htmlFor="mentoringTitle" className="block text-gray-700 font-semibold mb-2">멘토링 제목</label>
        <input
          type="text"
          id="mentoringTitle"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          placeholder="예: 주니어 프론트엔드 개발자를 위한 React 멘토링"
          value={mentoringTitle}
          onChange={(e) => setMentoringTitle(e.target.value)}
          required
        />
      </div>

      {/* 자기소개 */}
      <div className="mb-4">
        <label htmlFor="intro" className="block text-gray-700 font-semibold mb-2">자기소개</label>
        <textarea
          id="intro"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          placeholder="해당 지원서는 관리자의 검토가 진행되는 내용이므로 참고하시고 작성해주시길 바랍니다."
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          required
        ></textarea>
      </div>

      {/* 직무 분야 */}
      <div className="mb-4">
        <label htmlFor="field" className="block text-gray-700 font-semibold mb-2">직무 분야</label>
        <input
          type="text"
          id="field"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          placeholder="예: 프론트엔드 개발, 백엔드 개발, 데이터 분석"
          value={field}
          onChange={(e) => setField(e.target.value)}
          required
        />
      </div>

      {/* 주요 경력 - 회사명과 기간으로 분리 */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">주요 경력</label>
        <div className="flex space-x-2">
          <input
            type="text"
            id="company"
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="회사명 (예: ABC 주식회사)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          
          <input
            type="text"
            id="period"
            className="w-1/3 p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            placeholder="기간 (예: 2020~현재)"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
        </div>
      </div>

      {/* 자격증 (선택 사항) */}
      <div className="mb-6">
        <label htmlFor="cert" className="block text-gray-700 font-semibold mb-2">자격증 (선택 사항)</label>
        <input
          type="text"
          id="cert"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          placeholder="예: 정보처리기사, OCPJP (없으면 비워두세요)"
          value={cert}
          onChange={(e) => setCert(e.target.value)}
        />
      </div>
      
      {/* 제출 버튼 */}
      <div className="flex justify-end">
        <button type="submit" className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors">
          지원서 제출하기
        </button>
      </div>
    </form>
  );
};

export default MentorApplicationForm;
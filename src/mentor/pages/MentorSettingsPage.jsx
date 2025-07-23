import React, { useState, useEffect } from 'react';
import axios from "../../common/lib/axios.js";
import BasicInfoSection from '../components/BasicInfoSection';
import MentoringInfoSection from '../components/MentoringInfoSection';
import DetailedDescriptionSection from '../components/DetailedDescriptionSection';
import CategorySection from '../components/CategorySection';
import TimeSettingsSection from '../components/TimeSettingsSection';
import SettlementInfoSection from '../components/SettlementInfoSection';
import { useNavigate } from 'react-router-dom'; // [추가] useNavigate 임포트

const MentoringSettingsPage = () => {
  // [추가] 멘토 설정 정보를 담을 상태
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // [추가] useNavigate 훅 초기화

  // [추가] 데이터 변경을 처리할 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  // [추가] 페이지 로드 시 멘토 설정 정보를 불러오는 로직
  useEffect(() => {
    const fetchMentorSettings = async () => {
      try {
        const response = await axios.get('/mentors/me/profile');
        setSettings(response.data);
      } catch (err) {
        console.error("멘토 설정 정보 로딩 실패:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorSettings();
  }, []);

  // [수정] 저장 버튼 클릭 시 미리보기 페이지로 이동
  const handleSave = () => {
    // 현재 settings 상태를 preview 페이지로 전달
    navigate('/mentor/settings/preview', { state: { settings } });
  };

  // [추가] 로딩 및 에러 처리 UI
  if (loading) return <div className="text-center p-10">로딩 중...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!settings) return <div className="text-center p-10">데이터가 없습니다.</div>;

  const handleCancel = () => {
    navigate('/mypage'); // 취소 시 설정 페이지로 돌아가기
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">멘토링 설정</h1>

      {/* [수정] 각 섹션에 데이터와 핸들러를 props로 전달 */}
      <BasicInfoSection data={settings} onChange={handleChange} />
      <MentoringInfoSection data={settings} onChange={handleChange} />
      <DetailedDescriptionSection data={settings} onChange={handleChange} />
      <CategorySection fields={settings.fields || []} setSettings={setSettings} />
      <TimeSettingsSection availableTimes={settings.availableTimes || []} setSettings={setSettings} />
      <SettlementInfoSection data={settings} onChange={handleChange} />

      <div className="flex justify-end mt-10 space-x-4">
        {/* [수정] 저장 버튼에 onClick 핸들러 연결 */}
        <button
          onClick={handleCancel}
          className="bg-red-400 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-400 transition"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default MentoringSettingsPage;

import React from 'react';

// [수정] data와 onChange를 props로 받도록 변경
const BasicInfoSection = ({ data, onChange }) => {
  return (
    <section className="border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">기본 정보</h2>

      <div className="space-y-4">
        {/* [수정] 멘토링 제목 필드만 남김 */}
        <div>
          <label htmlFor="mentoringTitle" className="block text-sm font-medium text-gray-700 mb-1">
            멘토링 제목
          </label>
          <input
            type="text"
            id="mentoringTitle"
            name="mentoringTitle"
            placeholder="멘토링 제목을 입력하세요 (예: 실전! 스프링부트 프로젝트 개발)"
            className="w-full border p-2 rounded-md"
            value={data.mentoringTitle || ''}
            onChange={onChange}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfoSection;

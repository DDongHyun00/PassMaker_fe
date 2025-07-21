import React from 'react';

// [수정] data와 onChange를 props로 받도록 변경
const DetailedDescriptionSection = ({ data, onChange }) => {
  return (
    <section className="border p-4 rounded-xl shadow-sm">
      {/* [수정] 컴포넌트 제목 변경 */}
      <h2 className="text-xl font-semibold mb-4">자기소개</h2>

      {/* [수정] textarea를 intro 필드와 연결 */}
      <textarea
        name="intro" // [추가] name 속성
        placeholder="멘토님의 전문성과 경험을 바탕으로 자기소개를 자세히 작성해주세요."
        className="w-full border p-2 rounded-md h-40"
        value={data.intro || ''}
        onChange={onChange}
      />
    </section>
  );
};

export default DetailedDescriptionSection;

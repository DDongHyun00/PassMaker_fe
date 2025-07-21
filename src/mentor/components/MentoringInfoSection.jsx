import React from "react";

// [수정] data와 onChange를 props로 받도록 변경
const MentoringInfoSection = ({ data, onChange }) => {
  return (
    <section className="border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">멘토링 정보</h2>

      {/* [수정] 불필요한 필드를 제거하고 레이아웃을 단순화 */}
      <div className="space-y-2">
        <div>
          <label
            htmlFor="hourlyRate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            시간당 가격 (원)
          </label>
          <input
            type="number"
            id="hourlyRate" // [추가] label과 input 연결을 위한 id
            name="hourlyRate" // [추가] name 속성
            placeholder="시간당 가격을 원 단위로 입력하세요"
            className="border p-2 rounded-md w-full md:w-1/2" // [수정] 너비 조정
            value={data.hourlyRate || ""}
            onChange={onChange}
          />
        </div>
        {/* [추가] 비즈니스 규칙에 대한 안내 텍스트 */}
        <p className="text-sm text-gray-500">
          * 멘토링은 1시간 단위의 1:1 세션으로 진행됩니다.
        </p>
      </div>
    </section>
  );
};

export default MentoringInfoSection;

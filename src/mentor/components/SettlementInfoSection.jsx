import React from 'react';

// [수정] data와 onChange를 props로 받도록 변경
const SettlementInfoSection = ({ data, onChange }) => {
  return (
    <section className="border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">정산 정보</h2>

      <div className="space-y-4">
        {/* [수정] value와 onChange를 props와 연결 (백엔드 미연동) */}
        <input
          type="text"
          name="accountHolder" // [추가] name 속성
          placeholder="예금주"
          className="w-full border p-2 rounded-md"
          value={data.accountHolder || ''}
          onChange={onChange}
        />
        {/* [수정] value와 onChange를 props와 연결 (백엔드 미연동) */}
        <input
          type="text"
          name="bankName" // [추가] name 속성
          placeholder="은행명"
          className="w-full border p-2 rounded-md"
          value={data.bankName || ''}
          onChange={onChange}
        />
        {/* [수정] value와 onChange를 props와 연결 (백엔드 미연동) */}
        <input
          type="text"
          name="accountNumber" // [추가] name 속성
          placeholder="계좌번호"
          className="w-full border p-2 rounded-md"
          value={data.accountNumber || ''}
          onChange={onChange}
        />
      </div>
      {/* [추가] 백엔드 미연동 안내 */}
      <p className="text-sm text-red-500 mt-2">
        * 정산 정보는 현재 백엔드와 연동되지 않았습니다. 추후 업데이트 예정입니다.
      </p>
    </section>
  );
};

export default SettlementInfoSection;

import React, { useState } from 'react';

// [수정] data와 onChange를 props 대신, fields와 setSettings를 받도록 변경
const CategorySection = ({ fields, setSettings }) => {
  const [newField, setNewField] = useState('');

  const handleAddField = () => {
    if (newField && !fields.some(f => f.fieldName === newField)) {
      const updatedFields = [...fields, { fieldName: newField }];
      // 상위 컴포넌트의 상태를 직접 업데이트
      setSettings(prev => ({ ...prev, fields: updatedFields }));
      setNewField('');
    }
  };

  const handleRemoveField = (fieldName) => {
    const updatedFields = fields.filter(f => f.fieldName !== fieldName);
    setSettings(prev => ({ ...prev, fields: updatedFields }));
  };

  return (
    <section className="border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">전문 분야 (카테고리)</h2>
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          placeholder="분야를 입력하세요 (예: Spring Boot)"
          className="border p-2 rounded-md flex-grow"
        />
        <button
          onClick={handleAddField}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          추가
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {fields.map((field, index) => (
          <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
            <span>{field.fieldName}</span>
            <button
              onClick={() => handleRemoveField(field.fieldName)}
              className="ml-2 text-purple-600 hover:text-purple-800"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">* 멘토링을 진행할 전문 분야를 추가해주세요.</p>
    </section>
  );
};

export default CategorySection;

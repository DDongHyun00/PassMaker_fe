import React, { useState, useEffect } from 'react';
import MentorCard from './MentorCard';

const categories = [
  '전체', '개발자', '디자이너', '기획자',
  '마케터', '데이터 분석가', 'HR', '영업'
];

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState('전체');

  useEffect(() => {
    fetch('http://localhost:8080/api/mentors', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(data => setMentors(data))
      .catch(console.error);
  }, []);

  // 1) 직무별 필터
  const filtered = selected === '전체'
    ? mentors
    : mentors.filter(m => m.fieldName === selected);

  // 2) 인기 멘토 (백엔드에서 isPopular 필드 제공 가정)
  const popular = mentors.filter(m => m.isPopular);

  return (
    <div className="space-y-12">
      {/* ─── 직무별 멘토 찾기 ─── */}
      <section>
        <h2 className="text-2xl font-bold mb-4">직무별 멘토 찾기</h2>
        <div className="flex space-x-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={
                `px-4 py-2 rounded-full transition ${
                  selected === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`
              }
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6">
          {filtered.map((m, i) => (
            <MentorCard
              key={m.id ?? i}
              avatarUrl={m.thumbnail}
              role={m.fieldName}
              experience={m.careerDesc}
              name={m.nickname}
              title={m.intro}
              rating={m.rating}
              reviewCount={m.reviewCount}
              onConsult={() => alert(`${m.nickname}님 상담 요청`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard";

import defaultAvatar from "../../assets/default_user.png";

const categories = [
  "전체",
  "Frontend",
  "JavaScript",
  "기획자",
  "마케터",
  "데이터 분석가",
  "HR",
  "영업",
];

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState("전체");

  useEffect(() => {
    fetch("http://localhost:8080/api/mentors", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("서버 오류: " + res.status);
        return res.json();
      })
      .then((data) => setMentors(data))
      .catch((err) => {
        console.error("MentorList fetch 실패:", err.message);
      });
  }, []);

  // 1) 직무별 필터
  const filtered =
    selected === "전체"
      ? mentors
      : mentors.filter((m) => m.fieldName === selected);

  // 2) 인기 멘토 (백엔드에서 isPopular 필드 제공 가정)
  const popular = mentors.filter((m) => m.isPopular);

  return (
    <div className="px-4 space-y-12">
      {/* ─── 직무별 멘토 찾기 ─── */}
      <section className="px-4">
        <h1 className="text-4xl font-bold mb-8 mt-8">직무별 멘토 찾기</h1>
        <div className="flex space-x-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selected === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((m, i) => (
            <MentorCard
              key={m.id ?? i}
              id={m.nickname}
              nickname={m.nickname} // ✅ 이거 하나만 추가!
              avatarUrl={defaultAvatar}
              role={m.fieldName}
              experience={m.careerDesc}
              name={m.nickname}
              title={m.intro}
              rating={m.rating}
              reviewCount={m.reviewCount}
              mentoringTitle={m.mentoringTitle}
              hourlyRate={m.hourlyRate}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

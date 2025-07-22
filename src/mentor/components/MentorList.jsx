import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import axios from "axios"; // axios import 추가

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
    const fetchMentors = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/mentors", {
          withCredentials: true,
        });
        setMentors(res.data);
      } catch (err) {
        console.error("MentorList fetch 실패:", err.message);
      }
    };
    fetchMentors();
  }, []);

  // 1) 직무별 필터
  const filtered =
    selected === "전체"
      ? mentors
      : mentors.filter((m) => m.fieldName === selected);

  // 2) 인기 멘토 (백엔드에서 isPopular 필드 제공 가정)
  const popular = mentors.filter((m) => m.isPopular);

  return (
    <div className="mentorlist-bg px-2 space-y-20 pt-32">
      <section className="w-full">
        <h1 className="text-4xl font-extrabold text-primary mb-10 tracking-tight drop-shadow">
          직무별 멘토 찾기
        </h1>
        <div className="flex flex-wrap gap-5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`mentor-filter-btn px-10 py-3 rounded-2xl font-bold text-lg transition-all shadow-lg border-2 ${selected === cat ? "selected" : ""}`}
              style={{ minWidth: 120 }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {filtered.map((m, i) => (
            <MentorCard
              key={m.id ?? i}
              id={m.nickname}
              nickname={m.nickname}
              avatarUrl={m.thumbnail ? m.thumbnail : defaultAvatar}
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

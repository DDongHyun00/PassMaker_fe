import React, { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import axios from "axios"; // axios import 추가

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

const PAGE_SIZE = 15;

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [selected, setSelected] = useState("전체");
  const [page, setPage] = useState(1);

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

  // 페이징 처리
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedMentors = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 페이지 변경 시 스크롤 상단 이동
  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-transparent mentorlist-bg space-y-16">
      <section className="w-full">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-8 tracking-tight drop-shadow text-left">
          직무별 멘토 찾기
        </h1>
        <div className="flex flex-wrap gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelected(cat);
                setPage(1);
              }}
              className={`border-2 border-primary font-semibold rounded-md shadow-md px-6 py-2 transition-all duration-150 ${selected === cat ? "bg-primary text-black" : "bg-white text-primary hover:bg-black hover:text-white"}`}
              style={{ minWidth: 100 }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 xl:gap-8 items-stretch">
          {pagedMentors.map((m, i) => (
            <MentorCard
              key={m.id ?? i}
              id={m.nickname}
              nickname={m.nickname}
              avatarUrl={m.thumbnail}
              role={m.fieldName}
              experience={m.careerDesc}
              name={m.nickname}
              title={m.intro}
              rating={m.rating}
              reviewCount={m.reviewCount}
              mentoringTitle={m.mentoringTitle}
              hourlyRate={m.hourlyRate}
              className="w-full"
            />
          ))}
        </div>
        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-10 h-10 rounded-full font-bold border-2 transition text-lg flex items-center justify-center ${page === idx + 1 ? "bg-primary text-black border-primary" : "bg-white text-primary border-primary hover:bg-primary hover:text-white"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

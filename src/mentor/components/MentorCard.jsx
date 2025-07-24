// src/mentor/components/MentorCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import defaultUser from "../../assets/default_user.png";

const MentorCard = ({
  id,
  nickname, // ✅ 추가
  avatarUrl,
  role,
  experience,
  name,
  rating,
  reviewCount,
  mentoringTitle,
  hourlyRate,
}) => {
  return (
    <Link to={`/mentors/${nickname}`} className="block h-full">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-200 ease w-[240px] h-[340px] md:h-[370px]">
        <div className="w-full flex flex-col flex-1">
          {/* 닉네임 & 별점 최상단 */}
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-base md:text-lg font-bold text-gray-900">
              {name}
            </span>
            <span className="flex items-center text-sm text-gray-500 gap-1">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">{rating?.toFixed(1)}</span>
              <span>({reviewCount})</span>
            </span>
          </div>
          {/* 아바타 */}
          <div className="flex flex-col items-center flex-shrink-0 min-h-[80px] md:min-h-[96px] mb-1">
            <img
              src={
                avatarUrl && avatarUrl.trim() !== "" ? avatarUrl : defaultUser
              }
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto border-2 border-black"
              alt="멘토 프로필"
            />
          </div>
          {/* 직무 */}
          <p className="text-sm text-gray-500 mb-1 line-clamp-2 min-h-[32px] text-center">
            {role}
          </p>
          {/* 멘토링 제목 */}
          <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 min-h-[48px] mb-2 text-center">
            {mentoringTitle}
          </h3>
          {/* 경력 */}
          <p className="text-sm text-gray-500 mb-2 line-clamp-2 min-h-[32px] text-center">
            {experience}
          </p>
          {/* 가격 구분선 & 가격 */}
          <div className="border-t border-gray-200 w-full mb-1"></div>
          <div className="text-primary font-bold text-xl mt-auto min-h-[36px] mb-0 pb-2 flex items-end justify-center text-center truncate">
            {hourlyRate?.toLocaleString()}원 / `시간`
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;

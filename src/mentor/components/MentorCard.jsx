// src/mentor/components/MentorCard.jsx
import React from "react";
import { Link } from "react-router-dom";

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
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-200 ease w-full h-[340px] md:h-[370px]">
        <div className="w-full flex flex-col flex-1">
          <div className="flex flex-col items-center flex-shrink-0 min-h-[80px] md:min-h-[96px]">
            <img
              src={avatarUrl}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mx-auto mb-4"
            />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2 min-h-[48px] mb-2 text-center">
            {mentoringTitle}
          </h3>
          <p className="text-sm text-gray-500 mb-1 line-clamp-2 min-h-[32px] text-center">
            {role}
          </p>
          <p className="text-sm text-gray-500 mb-2 line-clamp-2 min-h-[32px] text-center">
            {experience}
          </p>
          <div className="flex flex-col items-center min-h-[28px] mb-2">
            <h4 className="text-base font-semibold text-gray-800 text-center">
              {name}
            </h4>
            <div className="flex items-center text-sm text-gray-500 space-x-1 justify-center text-center">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">{rating?.toFixed(1)}</span>
              <span>({reviewCount})</span>
            </div>
          </div>
          <div className="text-primary font-bold text-xl mt-auto min-h-[36px] mb-0 pb-2 flex items-end justify-center text-center truncate">
            {hourlyRate?.toLocaleString()}원 / 시간
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;

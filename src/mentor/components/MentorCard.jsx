// src/mentor/components/MentorCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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
    <Link to={`/mentors/${nickname}`} className="block h-full"> {/* ✅ 수정 */}
      <div className="mentor-card">
        <img
          src={avatarUrl}
          alt={name}
          className="mentor-card-img"
        />
        <div className="w-full flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-800 truncate my-2">
            {mentoringTitle}
          </h3>
          <p className="text-sm text-gray-500">
            {role} · {experience}
          </p>
          <div className="mt-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-semibold">{name}</h4>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold text-sm">{rating?.toFixed(1)}</span>
                <span className="text-gray-500 text-xs">({reviewCount})</span>
              </div>
            </div>
            <div className="text-right text-lg font-bold text-purple-600 mt-2">
              {hourlyRate?.toLocaleString()}원 / 시간
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MentorCard;

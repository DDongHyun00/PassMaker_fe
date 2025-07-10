import React from 'react';

const MentorCard = ({
  avatarUrl,
  role,
  experience,
  name,
  title,
  rating,
  reviewCount,
  onConsult,
}) => {
  return (
    <div className="w-[400px] h-[500px] bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img
        src={avatarUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <span className="text-purple-600">{role}</span>
          <span>{experience}</span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{name}</h3>
        <p className="text-gray-600 mb-4">{title}</p>
        <div className="flex items-center space-x-1 mb-6">
          <span className="text-yellow-400">⭐</span>
          <span className="font-semibold">{rating}</span>
          <span className="text-gray-500">({reviewCount}개 리뷰)</span>
        </div>
        <button
          onClick={onConsult}
          className="mt-auto py-3 bg-purple-600 text-white rounded-full text-lg font-medium"
        >
          상담하기
        </button>
      </div>
    </div>
  );
};

export default MentorCard;
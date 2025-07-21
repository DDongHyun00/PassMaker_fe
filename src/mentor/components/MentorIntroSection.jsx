import React from "react";
import {
  User,
  Briefcase,
  Code,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import defaultAvatar from "../../assets/default_user.png";

const MentorIntroSection = ({
  avatarUrl,
  nickname,
  rating,
  reviewCount,
  fields = [], // ex) ['Frontend', 'JavaScript']
  careers = [], // ex) [{ title: '카카오 | 프론트엔드 개발자', period: '2019년 1월 – 2021년 2월' }, …]
  skills = [], // ex) ['React', 'TypeScript']
  intro,
  onBook,      // ✅ 예약 버튼 클릭 시 실행할 함수 (MentorDetailPage에서 전달)
  onShare,     // 공유하기 버튼 핸들러
  onFavorite,  // 찜하기 버튼 핸들러
  onMessage,   // 메시지 보내기 버튼 핸들러
}) => (
  <section className="bg-white shadow-md rounded-lg p-6 mb-8">
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── 좌측: 프로필, 평점, 버튼, 액션 */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={avatarUrl || defaultAvatar}
            alt={`${nickname} 아바타`}
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
            className="w-32 h-32 rounded-full border-2 border-purple-600 mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">{nickname}</h2>
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 font-semibold">{rating}</span>
            <span className="ml-1 text-gray-500">({reviewCount}개 리뷰)</span>
          </div>

          {/* ✅ 멘토 예약 버튼 – 클릭 시 onBook 실행됨 */}
          <button
            onClick={onBook}
            className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 mb-4"
          >
            멘토 예약하기
          </button>

          {/* 공유/찜/메시지 버튼 */}
          <div className="flex space-x-6 text-gray-500 text-sm">
            <button
              onClick={onShare}
              className="flex items-center hover:text-gray-700"
            >
              <Share2 className="w-4 h-4 mr-1" /> 공유하기
            </button>
            <button
              onClick={onFavorite}
              className="flex items-center hover:text-gray-700"
            >
              <Heart className="w-4 h-4 mr-1" /> 찜하기
            </button>
            <button
              onClick={onMessage}
              className="flex items-center hover:text-gray-700"
            >
              <MessageCircle className="w-4 h-4 mr-1" /> 메시지
            </button>
          </div>
        </div>

        {/* ── 우측: 소개, 경력, 기술 스택 */}
        <div className="space-y-8">
          {/* 멘토 소개 */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <User className="w-5 h-5 text-purple-600 mr-2" />
              멘토 소개
            </h3>
            <p className="text-gray-700 leading-relaxed">{intro}</p>
          </div>

          {/* 경력 사항 */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <Briefcase className="w-5 h-5 text-purple-600 mr-2" />
              경력 사항
            </h3>
            <ul className="space-y-4 ml-4">
              {careers.map((c, i) => (
                <li key={i}>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-gray-500 text-sm">{c.period}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* 기술 스택 */}
          <div>
            <h3 className="flex items-center text-lg font-semibold mb-2">
              <Code className="w-5 h-5 text-purple-600 mr-2" />
              기술 스택
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="text-sm px-3 py-1 border border-gray-300 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MentorIntroSection;

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
  onBook, // ✅ 예약 버튼 클릭 시 실행할 함수 (MentorDetailPage에서 전달)
  onShare, // 공유하기 버튼 핸들러
  onFavorite, // 찜하기 버튼 핸들러
  onMessage, // 메시지 보내기 버튼 핸들러
}) => (
  <section className="mentor-detail-bg pt-32 py-12 px-2 max-w-5xl mx-auto">
    <div className="flex flex-col gap-10">
      {/* 프로필 카드 */}
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-10 p-10 border border-primary/10">
        {/* 프로필 이미지 및 액션 */}
        <div className="flex flex-col items-center md:items-center w-full md:w-1/3">
          <img
            src={avatarUrl || defaultAvatar}
            alt={`${nickname} 아바타`}
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
            className="w-44 h-44 rounded-full border-4 border-primary shadow-xl mb-6 object-cover bg-white"
          />
          <h2 className="text-3xl font-extrabold mb-1 text-gray-900 tracking-tight">
            {nickname}
          </h2>
          <div className="flex items-center mb-4 gap-2">
            <User className="w-6 h-6 text-yellow-400" />
            <span className="font-bold text-lg">{rating}</span>
            <span className="text-gray-500 text-base">
              ({reviewCount}개 리뷰)
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full mt-4">
            <button
              onClick={onBook}
              className="mentor-btn-main w-full py-3 text-lg font-bold rounded-xl shadow-md hover:scale-[1.03] transition"
            >
              멘토 예약하기
            </button>
            <div className="flex gap-2 w-full">
              <button
                onClick={onShare}
                className="mentor-btn-sub flex-1 py-2 text-base font-semibold rounded-xl hover:bg-primary/20 hover:text-primary transition"
              >
                <span className="inline-flex items-center gap-1">
                  <Share2 className="w-5 h-5" /> 공유하기
                </span>
              </button>
              <button
                onClick={onFavorite}
                className="mentor-btn-sub flex-1 py-2 text-base font-semibold rounded-xl hover:bg-primary/20 hover:text-primary transition"
              >
                <span className="inline-flex items-center gap-1">
                  <Heart className="w-5 h-5" /> 찜하기
                </span>
              </button>
              <button
                onClick={onMessage}
                className="mentor-btn-sub flex-1 py-2 text-base font-semibold rounded-xl hover:bg-primary/20 hover:text-primary transition"
              >
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="w-5 h-5" /> 메시지
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* 정보 카드 */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {/* 멘토 소개 */}
          <div className="bg-primary/5 rounded-2xl p-7 shadow border border-primary/10">
            <h3 className="flex items-center text-xl font-bold mb-3 text-primary border-b border-primary/20 pb-2">
              <User className="w-6 h-6 mr-2" /> 멘토 소개
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg min-h-[48px]">
              {intro}
            </p>
          </div>
          {/* 경력 사항 */}
          <div className="bg-primary/5 rounded-2xl p-7 shadow border border-primary/10">
            <h3 className="flex items-center text-xl font-bold mb-3 text-primary border-b border-primary/20 pb-2">
              <Briefcase className="w-6 h-6 mr-2" /> 경력 사항
            </h3>
            <ul className="space-y-3 ml-2">
              {careers.length === 0 ? (
                <li className="text-gray-400">경력 정보가 없습니다.</li>
              ) : (
                careers.map((c, i) => (
                  <li key={i}>
                    <p className="font-semibold text-base">{c.title}</p>
                    <p className="text-gray-500 text-sm">{c.period}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* 기술 스택 */}
          <div className="bg-primary/5 rounded-2xl p-7 shadow border border-primary/10">
            <h3 className="flex items-center text-xl font-bold mb-3 text-primary border-b border-primary/20 pb-2">
              <Code className="w-6 h-6 mr-2" /> 기술 스택
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length === 0 ? (
                <span className="text-gray-400">
                  등록된 기술 스택이 없습니다.
                </span>
              ) : (
                skills.map((s) => (
                  <span
                    key={s}
                    className="text-base px-4 py-1 border border-primary/30 rounded-full bg-primary/10 text-primary font-semibold"
                  >
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MentorIntroSection;

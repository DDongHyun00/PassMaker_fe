import React from "react";
import MyPageCard from "../../common/components/MyPageCard"; // [수정] 경로 변경
import MyPageButton from "../../common/components/MyPageButton"; // [수정] 경로 변경

const MentoringTogglePanel = ({
  enabled,
  onToggle,
  title = "개인공부용 멘토링페이지",
  onCommentClick,
  onSettingsClick,
  className = "",
}) => {
  return (
    <MyPageCard className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between p-4">
        {/* 1) 토글 스위치 */}
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>

        {/* 2) 멘토링 페이지 제목 */}
        <span className="flex-1 text-base font-medium text-gray-700 ml-4">
          {title}
        </span>

        {/* 3) 말풍선 아이콘 + 멘토링 설정 버튼 */}
        <div className="flex items-center space-x-2">
          <svg
            onClick={onCommentClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 cursor-pointer fill-current text-gray-700"
          >
            <path d="M21 6h-2V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12l4 4V8a2 2 0 0 0-2-2zM7 9h10v2H7V9zm6 4H7v-2h6v2zm4-6H7V5h10v2z" />
          </svg>
          <MyPageButton onClick={onSettingsClick}>
            멘토링 설정
          </MyPageButton>
        </div>
      </div>
    </MyPageCard>
  );
};

export default MentoringTogglePanel;

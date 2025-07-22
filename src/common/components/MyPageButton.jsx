// src/common/components/CustomButton.jsx
import React from "react";

const MyPageButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button type={type} onClick={onClick} className={`mypage-btn ${className}`}>
      {children}
    </button>
  );
};

export default MyPageButton;

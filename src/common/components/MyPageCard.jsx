import React from "react";

const MyPageCard = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl border-2 border-primary/10 p-12 mb-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default MyPageCard;

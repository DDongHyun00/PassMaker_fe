import React from 'react';

const Button = ({ onClick, children, variant = 'primary', className = '' }) => {
  // 공통 스타일: 패딩, 코너 둥글기, 폰트 굵기 등
  const baseStyle = 'px-8 py-3 rounded-lg font-semibold transition-colors';
  
  // Variant에 따른 스타일 정의
  const styles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-white text-purple-600 hover:bg-gray-100',
  };

  const buttonStyle = styles[variant] || styles.primary;

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${buttonStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
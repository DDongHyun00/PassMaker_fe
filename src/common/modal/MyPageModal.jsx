import React, { useEffect } from "react";

const Modal = ({ onClose, children, className = '' }) => {
  // ESC 키를 눌렀을 때 모달을 닫는 기능은 유지합니다.
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-primary/10 relative transform transition-all duration-300"
        style={{ animation: "slideUp 0.3s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-primary text-2xl font-bold"
        >
          &times;
        </button>
        {children}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
        `}
      </style>
    </div>
  );
};

export default Modal;

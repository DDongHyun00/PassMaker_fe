import React, { useEffect } from "react";

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300"
            style={{ animation: "fadeIn 0.3s ease-out" }}
        >
            <div
                className="bg-white p-6 rounded shadow-lg w-full max-w-md relative transform transition-all duration-300"
                style={{ animation: "slideUp 0.3s ease-out" }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>
                {children}
            </div>

            {/* 인라인 keyframes 추가 */}
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

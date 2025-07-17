// src/common/components/CustomButton.jsx
import React from "react";

const MyPageButton = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-600 transition ${className}`}
        >
            {children}
        </button>
    );
};

export default MyPageButton;

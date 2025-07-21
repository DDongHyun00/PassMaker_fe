import React from 'react';

const CompletionModal = ({ message, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">알림</h2>
                <p className="mb-6">{message}</p>
                <button
                    onClick={onConfirm}
                    className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default CompletionModal;

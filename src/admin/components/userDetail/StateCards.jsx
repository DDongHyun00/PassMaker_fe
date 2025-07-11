import React from 'react';

const StateCards = () => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">예약완료</h3>
                    <span className="text-xs text-gray-400">지난 30일</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                <p className="text-sm text-gray-500">2023년 10월 대비</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">팔로워</h3>
                    <span className="text-xs text-gray-400">지난 30일</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                <p className="text-sm text-gray-500">팔로워 변화</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-600">좋아요</h3>
                    <span className="text-xs text-gray-400">지난 30일</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                <p className="text-sm text-gray-500">좋아요 변화</p>
            </div>
        </div>
    )
}
export default StateCards;
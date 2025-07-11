import React from 'react';

const UserProfile = () => {
    return(
        <div className="flex flex-col + space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-blue-600">박</span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">박진만</h2>
                    <p className="text-sm text-gray-500">팀장 역할</p>
                </div>

                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">사용자 ID</span>
                        <span className="font-medium">USER_2023_1042</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">이메일</span>
                        <span className="font-medium">james.park@example.com</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">전화번호</span>
                        <span className="font-medium">010-1234-5678</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">가입일</span>
                        <span className="font-medium">2023년 1월 15일</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">최근 접속</span>
                        <span className="font-medium">2023년 11월 8일 14:23</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">접속 국가</span>
                        <span className="font-medium">미국(아마존 웹 서비스)</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="w-full bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100">
                        계정 삭제
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-600">멘토 상태</h3>
                        <span className="text-xs text-orange-900">신청중</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
                    <p className="text-sm text-gray-500">2023년 10월 대비</p>
            </div>
        </div>

    )
}

export default UserProfile;
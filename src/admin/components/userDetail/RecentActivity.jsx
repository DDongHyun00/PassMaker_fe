import React from 'react';

const RecentActivity = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">최근 활동</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">정렬 방식</span>
                    <button className="text-sm text-gray-700 hover:text-gray-900">최신순</button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">글</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">새로운 글을 작성했습니다</p>
                            <p className="text-xs text-gray-500">2023-11-08 10:30-11:00</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600">완료</span>
                        <span className="text-sm text-blue-600">상세보기</span>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-green-600">댓글</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">댓글을 남겼습니다</p>
                            <p className="text-xs text-gray-500">2023-11-08 14:30-17:00</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-blue-600">답글달기</span>
                        <span className="text-sm text-blue-600">상세보기</span>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-purple-600">공유</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">게시물을 공유했습니다</p>
                            <p className="text-xs text-gray-500">2023-10-28 13:00-14:00</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-blue-600">보기</span>
                        <span className="text-sm text-blue-600">상세보기</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-700">더 보기</button>
            </div>
        </div>
    )
}
export default RecentActivity;
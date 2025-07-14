import React from 'react';

const UserProfile = ({ user }) => {
    // 날짜 변환 유틸
    const formatDate = (dateString) => {
        if (!dateString) return '날짜 정보 없음';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-8">
                {/* 상단 사용자 정보 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-left">
                    <div className="mt-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {user.name ? user.name[0] : '?'}
              </span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                    </div>

                    <div className="space-y-4 mt-4 flex flex-col items-end mr-12">
                        <div className="flex justify-between w-full">
                            <span className="text-gray-600">사용자 ID</span>
                            <span className="font-medium">{user.id}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-600">이메일</span>
                            <span className="font-medium">{user.email}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-600">가입일</span>
                            <span className="font-medium">{formatDate(user.createdAt)}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-600">사용자 구분</span>
                            <span className="font-medium">{String(user.mentor).toLowerCase() === 'true' ? '멘토' : '멘티'}</span>
                        </div>
                    </div>
                </div>

                {/* 예약 내역 */}
                <div className="pl-10">
                    <div className="pt-10 pl-3 flex justify-between">
                        <span className="text-gray-600">예약내역</span>
                    </div>
                    <div className="w-full pt-4 bg-white">
                        <div className="overflow-x-auto border-2 mr-10">
                            <table className="w-full table-fixed divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">NO</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">예약번호</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">예약시간</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">멘토명</th>
                                    <th className="px-6 py-3 text-center font-medium text-gray-500 uppercase tracking-wider">결제금액</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {user.reservations && user.reservations.length > 0 ? (
                                    user.reservations.map((res, idx) => (
                                        <tr key={res.reserveId}>
                                            <td className="px-7 py-4 text-gray-900 text-center">{idx + 1}</td>
                                            <td className="px-7 py-4 text-gray-900 text-center">{res.reserveId}</td>
                                            <td className="px-7 py-4 text-gray-900 text-center">
                                                {formatDate(res.reservationTime)}
                                            </td>
                                            <td className="px-7 py-4 text-gray-900 text-center">{res.mentorName}</td>
                                            <td className="px-7 py-4 text-gray-900 text-center">
                                                {res.amount?.toLocaleString()}원
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-7 py-4 text-center text-gray-500">
                                            예약 내역이 없습니다.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="mt-6 pt-6 pr-10 border-gray-200 flex justify-end">
                    <button className="bg-red-50 text-orange-600 py-2 px-4 mr-4 rounded-md text-sm font-medium hover:bg-orange-100">
                        계정 정지
                    </button>
                    <button className="bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100">
                        계정 삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

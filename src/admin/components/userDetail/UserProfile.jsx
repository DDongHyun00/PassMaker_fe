import React, {useState} from 'react';
import axios from "../../../common/lib/axios.js";
import authApi from "../../../common/lib/axios.js";

const UserProfile = ({ user, onStatusChange, onUserUpdate }) => {
    const [isSuspendLoading, setIsSuspendLoading] = useState(false); // 계정 정지 로딩 상태
    const [isDeleteLoading, setIsDeleteLoading] = useState(false); // 계정 삭제 로딩 상태

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

    const restoreAccount = async () => {
        setIsSuspendLoading(true);  // 로딩 상태 설정
        try {
            await authApi.put(`/admin/users/${user.id}/restore`);  // 복원 API 호출
            alert('계정이 복원되었습니다.');
            onStatusChange('ACTIVE');
            const updatedUser = await authApi.get(`/admin/users/${user.id}`);
            onUserUpdate(updatedUser.data);
        } catch (error) {
            console.error('계정 복원 실패', error);
            alert('계정 복원에 실패했습니다.');
        } finally {
            setIsSuspendLoading(false);  // 로딩 상태 종료
        }
    };

    const suspendAccount = async () => {
        setIsSuspendLoading(true);
        try {
            await authApi.put(`/admin/users/${user.id}/suspend`);
            alert('계정이 정지되었습니다.');
            onStatusChange('SUSPENDED');  // 상태 변경 후 상위 컴포넌트에 전달
        } catch (error) {
            console.error('계정 정지 실패', error);
            alert('계정 정지에 실패했습니다.');
        } finally {
            setIsSuspendLoading(false);
        }
    };

    const deleteAccount = async () => {
        setIsDeleteLoading(true);
        try {
            await authApi.delete(`/admin/users/${user.id}`);
            alert('계정이 삭제되었습니다.');
            onStatusChange('DELETED');  // 상태 변경 후 상위 컴포넌트에 전달
        } catch (error) {
            console.error('계정 삭제 실패', error);
            alert('계정 삭제에 실패했습니다.');
        } finally {
            setIsDeleteLoading(false);
        }
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
                        <div className="flex justify-between w-full">
                            <span className="text-gray-600">유저 상태</span>
                            <span className="font-medium">{user.statusText}</span> {/* 유저 상태 표시 */}
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
                    <button
                        className="bg-green-50 text-green-600 py-2 px-4 mr-4 rounded-md text-sm font-medium hover:bg-green-100"
                        onClick={restoreAccount}
                        disabled={isSuspendLoading}
                    >
                        {isSuspendLoading ? '로딩 중...' : '계정 복원'}
                    </button>
                    <button className="bg-red-50 text-orange-600 py-2 px-4 mr-4 rounded-md text-sm font-medium hover:bg-orange-100"
                            onClick={suspendAccount}
                            disabled={isSuspendLoading}>
                        {isSuspendLoading ? '로딩 중...' : '계정 정지'}
                    </button>
                    <button className="bg-red-50 text-red-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-red-100"
                            onClick={deleteAccount}
                            disabled={isDeleteLoading}>
                        {isDeleteLoading ? '로딩 중...' : '계정 삭제'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

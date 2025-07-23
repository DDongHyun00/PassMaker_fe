import React, { useState, useEffect } from 'react';
import authApi from '../../common/lib/axios';
import MyPageButton from '../../common/components/MyPageButton';

const MentorStatusToggle = ({ mentorId, currentStatus, onSuccess }) => {
    const [isActive, setIsActive] = useState(currentStatus);

    useEffect(() => {
        setIsActive(currentStatus);
    }, [currentStatus]);

    const handleToggle = async () => {
        try {
            const newStatus = !isActive;
            // TODO: 실제 멘토 상태 변경 API 엔드포인트로 변경 필요
            const res = await authApi.patch(`/mentors/me/status`, { mentorId, isActive: newStatus });
            setIsActive(res.data.isActive);
            if (onSuccess) {
                onSuccess(); // 성공 콜백 호출
            }
        } catch (err) {
            console.error("멘토 상태 변경 실패", err);
            alert("멘토 상태 변경에 실패했습니다.");
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <span className="text-lg font-medium">
                현재 상태: <span className={`font-bold ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isActive ? '활성 (모집 중)' : '비활성'}
                </span>
            </span>
            <MyPageButton onClick={handleToggle}>
                {isActive ? '비활성으로 전환' : '활성으로 전환'}
            </MyPageButton>
        </div>
    );
};

export default MentorStatusToggle;

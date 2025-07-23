import React, { useState, useEffect } from 'react';
import authApi from '../../common/lib/axios';
import MyPageButton from '../../common/components/MyPageButton';

const MentorProfileEdit = ({ currentProfile, onUpdate, onSuccess }) => {
    const [formData, setFormData] = useState({
        intro: currentProfile.intro || '',
        field: currentProfile.field || '',
        career: currentProfile.career || '',
        cert: currentProfile.cert || '',
        // 추가 필드 (예: thumbnail, mentoringTitle, hourlyRate)는 필요에 따라 추가
    });

    useEffect(() => {
        setFormData({
            intro: currentProfile.intro || '',
            field: currentProfile.field || '',
            career: currentProfile.career || '',
            cert: currentProfile.cert || '',
        });
    }, [currentProfile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // TODO: 실제 멘토 프로필 수정 API 엔드포인트로 변경 필요
            const res = await authApi.put("/mentors/me/edit-profile", formData);
            if (onUpdate) {
                onUpdate(res.data); // 부모 컴포넌트의 상태 업데이트
            }
            if (onSuccess) {
                onSuccess(); // 성공 콜백 호출
            }
        } catch (err) {
            console.error("멘토 프로필 업데이트 실패", err);
            alert("멘토 프로필 업데이트에 실패했습니다.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="intro" className="block text-sm font-medium text-gray-700">멘토 소개글</label>
                <textarea
                    id="intro"
                    name="intro"
                    rows="3"
                    value={formData.intro}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                ></textarea>
            </div>
            <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700">전문 분야</label>
                <input
                    type="text"
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="career" className="block text-sm font-medium text-gray-700">경력</label>
                <input
                    type="text"
                    id="career"
                    name="career"
                    value={formData.career}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="cert" className="block text-sm font-medium text-gray-700">자격증</label>
                <input
                    type="text"
                    id="cert"
                    name="cert"
                    value={formData.cert}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <MyPageButton type="submit">프로필 업데이트</MyPageButton>
        </form>
    );
};

export default MentorProfileEdit;

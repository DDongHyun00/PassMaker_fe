import React from "react";

const MyInfoView = ({ profile }) => {
    return (
        <div>
            <h3 className="text-xl font-bold mb-4">내 정보 조회</h3>
            <p><strong>이름:</strong> {profile.name}</p>
            <p><strong>닉네임:</strong> {profile.nickname}</p>
            <p><strong>이메일:</strong> {profile.email}</p>
            <p><strong>전화번호:</strong> {profile.phone}</p>
            <p><strong>가입일:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default MyInfoView;

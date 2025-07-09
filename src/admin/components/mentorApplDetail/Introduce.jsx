import React from "react";

const Introduce = () => {
    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">자기소개</h2>
            <div className="prose prose-gray max-w-none">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>안녕하세요, 저는 프론트엔드 개발자로 7년간 경험을 쌓고 있습니다. 현재는 리딩 IT 플랫폼에서 시니어 개발자로 근무하고 있습니다.</p>
                    <p>저는 주로 React, Redux, TypeScript, Node.js를 활용한 웹 애플리케이션 개발에 전문성을 갖고 있습니다.</p>
                    <p>최근 추가 사항을 업데이트 중이며 멘토링 서비스도 AI 기반 맞춤형 멘토링 서비스를 통해 멘토링 경험을 쌓아 나가고 있습니다.</p>
                    <p>멘토로서 제가 가진 정보와 경험을 공유하여 함께하는 멘티들이 업무에 임하는 자세를 더욱 성취감 있게 만들어 나가고 싶습니다.</p>
                </div>
            </div>
        </div>
    )
}
export default Introduce;
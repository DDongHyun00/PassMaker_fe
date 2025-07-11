import React from 'react';

const MentoringPlan = () => {
    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">멘토링 지원</h2>
            <div className="space-y-5">
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">멘토링 분야</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        웹 개발 전반에 대한 멘토링과 취업 상담
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">멘토링 방식</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                        1:1 화상 통화 (2시간), 채팅 상담, 코드 리뷰
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">기대 효과</h3>
                    <ul className="text-gray-600 space-y-2">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            실무 JavaScript 관련 질문 해결
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            React 생태계 및 관련 라이브러리 활용
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            취업 준비 및 기술 면접 준비
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            포트폴리오 제작 및 프로젝트 관리
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            기술 트렌드 및 최신 개발 동향 파악
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default MentoringPlan;
import React from 'react';

const Projects = () => {
    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">스킬별 프로젝트</h2>
            <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">웹 개발 프로젝트</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      2019년 7월 ~ 2019년 8월
                    </span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <p>• 스킬정보 시스템 통합 및 개선</p>
                        <p>• 한국정보 및 DX기술 그룹</p>
                        <p>• 신규 기술 도입 및 시스템 최적화</p>
                        <p>• HTML5, CSS3, JavaScript를 활용한 프론트엔드 개발</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects;
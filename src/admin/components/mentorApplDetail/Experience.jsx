import React from 'react';

const Experience = () => {
    const experiences = [
        {
            company: 'ABC 테크놀로지',
            position: '시니어 프론트엔드 개발자',
            period: '2018년 3월 ~ 현재',
            description: '대규모 전자상거래 플랫폼을 담당하며 사용자 경험 개선 및 성능 최적화',
            achievements: [
                'React, Redux를 활용한 SPA 개발 및 유지보수',
                'TypeScript 도입으로 코드 품질 향상',
                '국제화(i18n) 프로젝트 리드 및 시스템 구축'
            ]
        },
        {
            company: 'XYZ',
            position: '프론트엔드 개발자',
            period: '2015년 5월 ~ 2018년 2월',
            description: '모바일 플랫폼 및 웹 애플리케이션 개발',
            achievements: [
                '반응형 웹 디자인 구현 및 크로스 브라우징 대응',
                'JavaScript, jQuery, Bootstrap을 활용한 동적 웹 페이지 제작',
                'RESTful API 연동 및 데이터 시각화 구현'
            ]
        }
    ];

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">경력 사항</h2>
            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1.5 mr-4"></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
                                        <p className="text-blue-600 font-medium">{exp.position}</p>
                                    </div>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                                </div>
                                <p className="text-gray-600 mb-4">{exp.description}</p>
                                <div className="space-y-2">
                                    {exp.achievements.map((achievement, achIndex) => (
                                        <div key={achIndex} className="flex items-start">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-gray-600">{achievement}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {index < experiences.length - 1 && (
                            <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience;
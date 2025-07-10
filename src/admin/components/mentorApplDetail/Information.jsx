import React from 'react';
import {Calendar, FileText, Mail, MapPin, Phone} from "lucide-react";

const Information = () => {

    const skills = ['React', 'JavaScript', 'Node.js', 'TypeScript', 'HTML5', 'CSS3'];

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="mr-2 text-blue-600" size={20} />
                기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">신청자 정보</h3>
                        <div className="space-y-2">
                            <div className="flex items-center text-gray-600">
                                <Calendar size={16} className="mr-2" />
                                <span>2024년 05월 11일 오전 8시</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Mail size={16} className="mr-2" />
                                <span>김00 (kanghyun@example.com)</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone size={16} className="mr-2" />
                                <span>010-1234-5678</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <MapPin size={16} className="mr-2" />
                                <span>직급: 주임</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">전문 분야</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                            ))}
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2">활동 가능 시간</h4>
                            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                평일 오전 9시 ~ 오후 6시 (주 5일)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information;
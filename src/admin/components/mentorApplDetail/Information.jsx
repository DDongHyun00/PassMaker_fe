import React from 'react';
import {Calendar, FileText, UserRound, Bolt} from "lucide-react";

const Information = ({data}) => {

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
                                <span>{data.submittedAt.split('T')[0]}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <UserRound size={16} className="mr-2" />
                                <span>{data.applicantName} </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Bolt size={16} className="mr-2" />
                                <span>{data.applyFields && data.applyFields.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-3">자격증</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.certifications.map((cert, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Information;
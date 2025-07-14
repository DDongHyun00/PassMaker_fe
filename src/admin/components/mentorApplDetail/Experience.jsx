import React from 'react';

const Experience = ({careers}) => {
    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">경력 사항</h2>
            <div className="space-y-8">
                {careers.map((exp, index) => (
                    <div key={index} className="relative">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1.5 mr-4"></div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{exp.company}</h3>
                                    </div>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {exp.period}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {index < careers.length - 1 && (
                            <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience;
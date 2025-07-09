import React from 'react';
import {BarChart3} from "lucide-react";

const ApplicationStatus = () => {
    return(
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">멘토 신청 현황</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">총 신청</p>
                            <p className="text-2xl font-bold text-gray-900">24</p>
                            <p className="text-sm text-gray-500">전월 대비 12% 증가</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">승인</p>
                            <p className="text-2xl font-bold text-gray-900">15</p>
                            <p className="text-sm text-gray-500">승인률 62.5%</p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50 text-green-600">
                            <BarChart3 className="w-6 h-6"/>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">대기중</p>
                            <p className="text-2xl font-bold text-gray-900">5</p>
                            <p className="text-sm text-gray-500">빠른 처리 필요</p>
                        </div>
                        <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationStatus;
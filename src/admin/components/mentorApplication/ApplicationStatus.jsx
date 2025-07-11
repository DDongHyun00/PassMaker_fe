import React from 'react';
import {BarChart3} from "lucide-react";

const ApplicationStatus = ({ applications, prevApplications=[] }) => {
    const currentTotal = applications.length;
    const prevTotal = prevApplications.length;

    const approved = applications.filter(app => app.status === '승인').length;
    const pending = applications.filter(app => app.status === '대기').length;
    const approvalRate = currentTotal ? ((approved / currentTotal) * 100).toFixed(1) : 0;

    const increasePercent = prevTotal
        ? (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1)
        : null;

    const increaseText = prevTotal
        ? `전월 대비 ${increasePercent > 0 ? '+' : ''}${increasePercent}% ${increasePercent >= 0 ? '증가' : '감소'}`
        : '전월 데이터 없음';

    return(
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">총 신청</p>
                            <p className="text-2xl font-bold text-gray-900">{currentTotal}</p>
                            <p className="text-sm text-gray-500">{increaseText}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{approved}</p>
                            <p className="text-sm text-gray-500">승인률 {approvalRate}%</p>
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
                            <p className="text-2xl font-bold text-gray-900">{pending}</p>
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
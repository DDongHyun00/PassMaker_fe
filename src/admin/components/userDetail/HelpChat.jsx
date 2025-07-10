import React from 'react';
import {CheckCircle} from "lucide-react";

const HelpChat = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">신고 내역</h3>
            </div>

            <div className="flex flex-col items-center space-y-5 ">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900 text-center">신고 내역이 없습니다.</p>
                    <p className="text-xs text-gray-500 text-center">이 사용자에 대한 신고 기록이 없습니다.</p>
                </div>
            </div>
        </div>
    )
}

export default HelpChat;
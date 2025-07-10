import React from 'react';
import {CheckCircle} from "lucide-react";

const HelpChat = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">고객 지원</h3>
                <CheckCircle className="w-5 h-5 text-green-500" />
            </div>

            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">온라인 지원 상태입니다</p>
                    <p className="text-xs text-gray-500">고 사용자에게 바로 도움을 드릴 수 있습니다!</p>
                </div>
            </div>
        </div>
    )
}

export default HelpChat;
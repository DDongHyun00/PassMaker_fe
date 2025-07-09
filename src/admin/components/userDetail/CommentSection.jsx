import React from 'react';
import {CheckCircle, MessageCircle} from "lucide-react";

const CommentSection = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">관리자 메모</h3>

            <div className="mb-4">
                <textarea className="w-full p-3 border border-gray-300 rounded-md resize-none" rows="3"
                          placeholder="이 사용자에게 메모를 남겨주세요...">

                </textarea>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">최대 메모 길이 255자</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                    메모 등록
                </button>
            </div>

            <div className="mt-6 space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">질문함</span>
                        <span className="text-xs text-blue-600">관리자가 등록한 메모</span>
                    </div>
                    <p className="text-sm text-blue-800">해당 사용자는 정상적으로 프로필을 업데이트했습니다.</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">미답변</span>
                        <span className="text-xs text-gray-500">관리자가 등록한 메모</span>
                    </div>
                    <p className="text-sm text-gray-700">이번 달 활동 빈도가 낮습니다. 확인이 필요합니다. 같은 메모를 계속 남겨주세요.</p>
                </div>
            </div>
        </div>
    )
}

export default CommentSection;
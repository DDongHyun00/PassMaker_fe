import React from "react";
import {CheckCircle, XCircle} from "lucide-react";

const Permission = () => {

    const handleApprove = () => {
        alert('멘토 신청이 승인되었습니다.');
    };
    const handleReject = () => {
        alert('멘토 신청이 반려되었습니다.');
    };

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">승인여부</h2>
            <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">관리자 코멘트</h3>
                    <p className="text-gray-700">
                        신청서 접수 완료, 검토 중 단계입니다.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-3 mt-6">
                    <button
                        onClick={handleApprove}
                        className="flex items-center justify-center bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                    >
                        <CheckCircle className="mr-2" size={18} />
                        승인하기
                    </button>
                    <button
                        onClick={handleReject}
                        className="flex items-center justify-center bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                    >
                        <XCircle className="mr-2" size={18} />
                        반려하기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Permission;
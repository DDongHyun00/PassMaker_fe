import React from "react";
import {AlertTriangle, Eye, MessageCircle} from "lucide-react";

const InfoCards = () => {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={16} />
                    <span className="font-semibold text-red-800">긴급처리</span>
                </div>
                <p className="text-sm text-red-700">
                    사용자에게 심각한 피해를 줄 수 있는 허위나는 부정적인 리뷰 수
                </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="text-yellow-600" size={16} />
                    <span className="font-semibold text-yellow-800">허위정보</span>
                </div>
                <p className="text-sm text-yellow-700">
                    사실 확인이 필요한 혹은 잘못된 제품 정보를 담고있는 리뷰 수
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                    <Eye className="text-blue-600" size={16} />
                    <span className="font-semibold text-blue-800">재검토 필요</span>
                </div>
                <p className="text-sm text-blue-700">
                    사용자 신고가 잘못되었거나 질문 등 종 재검토이 필요한 리뷰 수
                </p>
            </div>
        </div>
    );
};

export default InfoCards;
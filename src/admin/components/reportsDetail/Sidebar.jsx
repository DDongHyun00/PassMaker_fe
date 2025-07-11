import React, {useState} from "react";
import {ChevronDown} from "lucide-react";

const Sidebar = () => {
    const [selectedCategory, setSelectedCategory] = useState('처리 방식');

    return (
        <div className="w-80 bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">처리 결정</h3>
            <h3 className="text-medium text-gray-900 mb-2">처리 방법 선택</h3>

            <div className="mb-6">
                <div className="relative">
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option>처리방법선택</option>
                        <option>블라인드 승인</option>
                        <option>블라인드 거절</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="mt-4 space-y-2">
                    <div className="text-medium font-bold text-gray-600">결정 사유</div>
                    <div className="space-y-4">
                            <textarea
                                className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="결정 사유를 입력하세요."
                            ></textarea>
                    </div>
                </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700">
                처리 완료
            </button>

            <div className="mt-8">
                <h4 className="text-base font-medium text-gray-900 mb-4">처리 가이드라인</h4>

                <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                        <div className="text-sm font-medium text-gray-900 mb-1">플랫폼 상관 기준</div>
                        <div className="text-sm text-gray-600">
                            부적절한 리뷰쓰기 옵션
                            <br />
                            상관 기준 준수검토 및 조치
                            <br />
                            신고하는 경우
                            <br />
                            대응조치 진행방법 내용
                        </div>
                    </div>

                    <div className="border-l-4 border-gray-300 pl-4">
                        <div className="text-sm font-medium text-gray-900 mb-1">플랫폼 업무 기준</div>
                        <div className="text-sm text-gray-600">
                            수정편집 완료 후
                            <br />
                            수정 관련여부 가능여부 확인
                            <br />
                            고의 사용자 관련된
                            <br />
                            고의 사용 관련자
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h4 className="text-base font-medium text-gray-900 mb-2">처리 이력</h4>
                <div className="text-sm text-gray-600">
                    아직 처리 이력이 없습니다.
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
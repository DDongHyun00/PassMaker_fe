import React from "react";

const InquiryContents = () => {
    return (
        <div className="bg-white p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1:1 문의 상세 정보</h2>

            {/* 신고한 리뷰 내용 */}
            <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">문의 내용</h3>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="font-medium text-gray-900">김지혜</div>
                            <div className="text-sm text-gray-500">강남역 12번 출구 맞은편</div>
                        </div>
                    </div>

                    <div className="text-gray-700 font-bold mb-4">
                        친절한 설명이 기억에 머무나 기억났습니다
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                        이 레슨은 좋았어요만이 아니고 정말 활용도가 높은 내용이라고. 김지혜 선생님 꼼꼼하게 설명해주셔서. 이랑
                        정말 쉬움처럼 다룰 수 있는 팁들이 많아서입니다. 초급 사람이 이거기엔는. 지인이 좋은 시험이 틀렸을 후유증으로
                        하는 분들시기 전이는 끝까지했습니다.
                    </div>

                    <div className="flex flex-col justify-between text-sm text-gray-500 gap-y-2 pl-6">
                        <span>작성일 상세: 2023년 10월 10일</span>
                        <span>문의현황: 직원 처리완료 중이전</span>
                    </div>
                </div>
            </div>

            {/* 진행 단계 */}
            <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">문의 답변</h3>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="font-medium text-gray-900">김지혜</div>
                            <div className="text-sm text-gray-500">강남역 12번 출구 맞은편</div>
                        </div>
                    </div>
                    <div className="space-y-4 mb-2">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="제목을 작성해주세요."
                                type="text"
                            />
                    </div>

                    <div className="space-y-4">
                            <textarea
                                className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="내용을 작성해주세요."
                            ></textarea>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
            <button className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700">
                답변 등록
            </button>
            </div>
        </div>
    );
};

export default InquiryContents;
import React, { useEffect, useState } from "react";

// 더미 문의 데이터
const dummyInquiry = {
    no: 1,
    inquirer: "김지혜",
    title: "친절한 설명이 기억에 머무나 기억났습니다",
    content:
        "이 레슨은 좋았어요만이 아니고 정말 활용도가 높은 내용이라고. 김지혜 선생님 꼼꼼하게 설명해주셔서. 이랑 정말 쉬움처럼 다룰 수 있는 팁들이 많아서입니다. 초급 사람이 이거기엔는. 지인이 좋은 시험이 틀렸을 후유증으로 하는 분들시기 전이는 끝까지했습니다.",
    type: "멘토링",
    date: "2025년 7월 10일",
    status: "대기",
};

// 더미 답변 데이터
const dummyAnswer = {
    title: "답변 제목 예시입니다.",
    content: "안녕하세요. 문의 주셔서 감사합니다. 아래에 관련 내용을 안내드립니다.",
};

const InquiryContents = () => {
    const [inquiry, setInquiry] = useState(null);
    const [replyTitle, setReplyTitle] = useState("");
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        // 초기 데이터 로딩 (나중에 API 대체 가능)
        setInquiry(dummyInquiry);
        setReplyTitle(dummyAnswer.title);
        setReplyContent(dummyAnswer.content);
    }, []);

    const handleReplySubmit = () => {
        console.log("답변 등록:");
        console.log("제목:", replyTitle);
        console.log("내용:", replyContent);
        // 여기에 API 전송 로직 작성 예정
        alert("답변이 등록되었습니다.");
    };

    if (!inquiry) return <div className="p-6">로딩 중...</div>;

    return (
        <div className="bg-white p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1:1 문의 상세 정보</h2>

            {/* 신고한 리뷰 내용 */}
            <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">문의 내용</h3>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="font-medium text-gray-900">{inquiry.title}</div>
                            <div className="text-sm text-gray-500">{inquiry.inquirer}</div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-500 mb-4 pt-2">
                        {inquiry.content}
                    </div>

                    <div className="flex flex-col justify-between text-sm text-gray-500 pt-5">
                        <span>문의 구분 : {inquiry.type}</span>
                        <span>작성일 : {inquiry.date}</span>
                    </div>
                </div>
            </div>

            {/* 진행 단계 */}
            <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">문의 답변</h3>
                    <div className="space-y-4 mb-2">
                            <input
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="제목을 작성해주세요."
                                type="text"
                                value={replyTitle}
                                onChange={(e) => setReplyTitle(e.target.value)}
                            />
                    </div>
                    <div className="space-y-4">
                            <textarea
                                className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="내용을 작성해주세요."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            ></textarea>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
            <button
                onClick={handleReplySubmit}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700">
                답변 등록
            </button>
            </div>
        </div>
    );
};

export default InquiryContents;
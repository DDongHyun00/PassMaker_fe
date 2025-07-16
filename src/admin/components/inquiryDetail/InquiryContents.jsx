import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InquiryContents = () => {
    const { inquiryId } = useParams();
    const [inquiry, setInquiry] = useState(null);
    const [replyTitle, setReplyTitle] = useState("");
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/admin/inquiries/${inquiryId}`)
            .then(res => {
                setInquiry(res.data);
                setReplyTitle(res.data.respondTitle);
                setReplyContent(res.data.respondContent);
            })
            .catch(console.error);
    }, [inquiryId]);

    const handleReplySubmit = () => {
        axios.post(`http://localhost:8080/admin/inquiries/${inquiryId}/response`, {
            respondTitle: replyTitle,
            respondContent: replyContent
        }).then(() => {
            alert("답변이 등록되었습니다.");
        }).catch(console.error);
    };

    if (!inquiry) return <div className="p-6">로딩 중...</div>;

    return (
        <div className="w-full max-w-6xl bg-white p-6 mb-4 ml-0">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1:1 문의 상세 정보</h2>

            <div className="mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">문의 내용</h3>
                    <div className="flex items-start justify-between mb-3 ">
                        <div>
                            <div className="font-bold text-gray-900 mb-2">{inquiry.title}</div>
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
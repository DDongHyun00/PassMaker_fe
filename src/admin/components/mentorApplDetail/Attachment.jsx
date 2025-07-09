import React from 'react';
import {Download, FileText} from "lucide-react";

const Attachment = () => {
    const attachments = [
        { name: '이력서.pdf', type: 'pdf', date: '2024년 5월 11일 오전 8시', color: 'red' },
        { name: '자기소개서.docx', type: 'docx', date: '2024년 5월 11일 오전 8시', color: 'blue' },
        { name: '포트폴리오.jpg', type: 'jpg', date: '2024년 5월 11일 오전 8시', color: 'green' },
        { name: '경력증명서.pdf', type: 'pdf', date: '2024년 5월 11일 오전 8시', color: 'orange' }
    ];

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">첨부 파일</h2>
            <div className="space-y-3">
                {attachments.map((file, index) => (
                    <div key={index} className={`flex items-center p-4 bg-${file.color}-50 rounded-lg border border-${file.color}-100 hover:shadow-md transition-shadow cursor-pointer`}>
                        <FileText className={`text-${file.color}-600 mr-3`} size={20} />
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.date}</p>
                        </div>
                        <Download className="text-gray-400 hover:text-gray-600" size={16} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Attachment;
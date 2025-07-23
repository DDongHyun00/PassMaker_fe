import React from 'react';

const ReportsInfo = ({ report }) => {
    if (!report) return null;
    const reportDetails = report.report || {};

    return (
        <div className="ml-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">신고 정보</h3>
            <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col items-start justify-between mb-3">
                    <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">신고자 :</div>
                        <div className="font-medium text-sm text-gray-700">{reportDetails.reporterName}</div>
                    </div>
                    <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-2">신고 사유 :</div>
                        <div className="font-medium text-sm text-gray-700">{reportDetails.detail}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-between text-sm text-gray-500 gap-y-2">
                    {/*<div className="text-sm text-gray-500">신고일</div>*/}
                    {/*<div className="font-medium">{new Date(reportDetails.reportedAt).toLocaleString()}</div>*/}
                    <span>신고일: {new Date(reportDetails.reportedAt).toLocaleString()}</span>
                </div>

            </div>
        </div>
    );
};

export default ReportsInfo;
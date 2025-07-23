import React from "react";

const TablePayments = ({ settlementData, formatCurrency, getStatusColor }) => (
    <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">멘토별 정산내역</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm">더보기</button>
            </div>
        </div>
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">멘토 ID</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">멘토명</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">총 결제금액</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">멘토 정산 (70%)</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">관리자 정산 (30%)</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {settlementData.map((item) => (
                    <tr key={item.mentorId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">{item.mentorId}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">{item.mentor}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-900">₩{formatCurrency(item.payment)}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-green-600 font-medium">₩{formatCurrency(item.mentorShare)}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-blue-600 font-medium">₩{formatCurrency(item.adminShare)}</td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)
export default TablePayments;
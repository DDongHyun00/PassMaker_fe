import React from "react";

const DataTable = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-blue-600 text-sm">더보기</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                <tr className="border-b">
                    <th className="text-left py-2">항목</th>
                    <th className="text-left py-2">상태</th>
                    <th className="text-left py-2">수량</th>
                    <th className="text-left py-2">날짜</th>
                    <th className="text-left py-2">비고</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === '정상' ? 'bg-green-100 text-green-800' :
                        item.status === '대기' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
                        </td>
                        <td className="py-2">{item.quantity}</td>
                        <td className="py-2">{item.date}</td>
                        <td className="py-2">{item.note}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
);
export default DataTable;
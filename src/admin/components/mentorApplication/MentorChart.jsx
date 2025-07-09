import React from 'react';

const MentorChart = () => {
    const chartData = [
        { month: '01', value: 20 },
        { month: '02', value: 35 },
        { month: '03', value: 42 },
        { month: '04', value: 28 },
        { month: '05', value: 55 },
        { month: '06', value: 38 },
        { month: '07', value: 65 },
        { month: '08', value: 48 },
        { month: '09', value: 72 },
        { month: '10', value: 58 },
        { month: '11', value: 45 },
        { month: '12', value: 62 }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value));

    return(
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">월별 신청 현황</h3>
            <div className="flex items-end justify-between h-32 space-x-2">
                {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div
                            className="w-full bg-blue-500 rounded-t"
                            style={{ height: `${(data.value / maxValue) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
                최근 12개월 신청 추이
            </div>
        </div>
    )
}
export default MentorChart;
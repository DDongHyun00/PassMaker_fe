import React from 'react';

const MentorChart = ({ applications }) => {
    // 1월부터 12월까지 0으로 초기화
    const monthlyCounts = Array(12).fill(0);

    // 각 신청의 날짜에서 월 추출해서 개수 세기
    applications.forEach(app => {
        const date = new Date(app.applicationDate);
        const month = date.getMonth(); // 0 = Jan, 11 = Dec
        if (!isNaN(month)) {
            monthlyCounts[month]++;
        }
    });

    // 차트에 쓸 데이터 만들기
    const chartData = monthlyCounts.map((count, index) => ({
        month: String(index + 1).padStart(2, '0'),
        value: count
    }));

    const maxValue = Math.max(...chartData.map(d => d.value), 1);

    // 디버깅 로그
    console.log("월별 신청 수:", monthlyCounts);
    console.log("차트 데이터:", chartData);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900 mb-4">월별 신청 현황</h3>
            <div className="flex items-end justify-between h-32 space-x-2">
                {chartData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                        <div
                            className="w-full bg-blue-500 rounded-t transition-all duration-300"
                            style={{
                                height: `${(data.value / maxValue) * 100}%`,
                                minHeight: data.value > 0 ? '8px' : '0px'  // 막대 최소 높이 설정
                            }}
                            title={`${data.month}월: ${data.value}건`}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
                최근 12개월 신청 추이
            </div>
        </div>
    );
};

export default MentorChart;

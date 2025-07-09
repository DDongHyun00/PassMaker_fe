import React from 'react';

    const chartData = [
        { month: '10월', value1: 8, value2: 12 },
        { month: '11월', value1: 6, value2: 10 },
        { month: '12월', value1: 4, value2: 8 },
        { month: '1월', value1: 3, value2: 6 },
        { month: '2월', value1: 2, value2: 4 },
    ];

const UserChart = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">게시물 추이</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">글 수</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">좋아요</span>
                    </div>
                </div>
            </div>

            <div className="h-48 flex items-end justify-between space-x-4">
                {chartData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                        <div className="w-full flex flex-col items-center space-y-1">
                            <div
                                className="w-6 bg-blue-500 rounded-t"
                                style={{ height: `${item.value1 * 8}px` }}
                            ></div>
                            <div
                                className="w-6 bg-orange-500 rounded-t"
                                style={{ height: `${item.value2 * 6}px` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500">{item.month}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserChart;
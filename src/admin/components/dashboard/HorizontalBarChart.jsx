import React from "react";

const HorizontalBarChart = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-blue-600 text-sm">더보기</button>
        </div>
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index} className="flex items-center">
                    <div className="w-20 text-sm text-gray-600">{item.name}</div>
                    <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="text-sm font-medium">{item.value}</div>
                </div>
            ))}
        </div>
    </div>
);
export default HorizontalBarChart;
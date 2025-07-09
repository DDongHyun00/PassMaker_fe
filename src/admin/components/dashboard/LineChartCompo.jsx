import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from "recharts";

const LineChartCompo = ({ data, title }) => (

    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-blue-600 text-sm">더보기</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="value1" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="value2" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);
export default LineChartCompo;
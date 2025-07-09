import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";
import React from "react";

const BarChartCompo = ({ data, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-blue-600 text-sm">더보기</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
        </ResponsiveContainer>
    </div>
);
export default BarChartCompo;
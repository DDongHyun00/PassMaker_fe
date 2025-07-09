import React from "react";

const StatCard = ({ title, value, change, changeType, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600 mb-1">{title}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
                <p className={`text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </p>
            </div>
            <div className={`text-2xl ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {icon}
            </div>
        </div>
    </div>
);

export default StatCard;
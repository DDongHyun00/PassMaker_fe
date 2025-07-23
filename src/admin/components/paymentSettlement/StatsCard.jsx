import React from  "react";
import {DollarSign} from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, iconColor = 'text-blue-600', bgColor = 'bg-blue-100' }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`${bgColor} p-3 rounded-full`}>
                {Icon && <Icon className={iconColor} size={24} />}
            </div>
        </div>
    </div>
);
export default StatsCard;
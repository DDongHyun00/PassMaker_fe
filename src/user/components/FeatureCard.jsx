import React from "react";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
    <Icon className="w-12 h-12 text-purple-500 mb-4" />
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
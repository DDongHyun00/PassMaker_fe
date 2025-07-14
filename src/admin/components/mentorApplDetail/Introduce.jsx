import React from "react";

const Introduce = ({intro}) => {
    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">자기소개</h2>
            <div className="prose prose-gray max-w-none">
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{intro}</p>
                </div>
            </div>
        </div>
    )
}
export default Introduce;
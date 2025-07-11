import React from 'react';

const PaymentHistory = () => {
    return(
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">결제 내역</h3>

            <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">결제 번호</span>
                        <span className="text-sm font-medium">PAY_2023_1421</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">날짜</span>
                        <span className="text-sm font-medium">2023-11-08</span>
                        <span className="text-sm text-gray-600">금액</span>
                        <span className="text-sm font-medium">₩50,000</span>
                    </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">결제 번호</span>
                        <span className="text-sm font-medium">PAY_2023_1142</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">날짜</span>
                        <span className="text-sm font-medium">2023-10-25</span>
                        <span className="text-sm text-gray-600">금액</span>
                        <span className="text-sm font-medium">₩50,000</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;
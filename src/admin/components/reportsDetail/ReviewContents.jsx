import React from "react";
import Rating from "./Rating.jsx";

const ReviewContents = ({review}) => {
    if (!review) return null;

    return (
        <div className="bg-white mb-4">
            <div className="ml-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">신고한 리뷰 내용</h3>
                <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="font-medium text-gray-900">{review.username}</div>
                            <Rating value={review.rating} />
                        </div>
                    </div>

                    <div className="text-sm text-gray-700 mb-4">
                        {review.content}
                    </div>

                    <div className="flex flex-col justify-between text-sm text-gray-500 gap-y-1">
                        <span>예약 ID: {review.reserveId}</span>
                        <span>작성일: {new Date(review.createdAt).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewContents;
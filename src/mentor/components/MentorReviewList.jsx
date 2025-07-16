import React from 'react';

const MentorReviewList = ({
  reviews, // 리뷰 데이터 배열을 props로 받습니다.
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">멘토링 리뷰</h2>
        <p className="text-gray-600">아직 작성된 리뷰가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">멘토링 리뷰 ({reviews.length}개)</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.reviewId} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">{review.reviewer.nickname || '익명'}</span>
              <span className="text-yellow-400">{'⭐'.repeat(review.rating)}</span>
              <span className="text-gray-500 text-sm ml-2">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MentorReviewList;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MentorIntroSection from '../components/MentorIntroSection';
import MentorReviewList from '../components/MentorReviewList';
import axios from '../../common/lib/axios';

export default function MentorDetailPage() {
  const { nickname } = useParams();
  const [mentor, setMentor] = useState(null);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorAndReviews = async () => {
      try {
        // 멘토 상세 정보 가져오기
        const mentorResponse = await axios.get(`/api/mentors/${nickname}`);
        const fetchedMentor = mentorResponse.data;
        setMentor(fetchedMentor);

        // 멘토 ID를 사용하여 리뷰 정보 가져오기
        if (fetchedMentor && fetchedMentor.mentorId) { // 멘토 ID가 있을 경우에만 리뷰 요청
          const reviewsResponse = await axios.get(`/api/mentors/${fetchedMentor.mentorId}/reviews`);
          setReviews(reviewsResponse.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorAndReviews();
  }, [nickname]);

  if (loading) {
    return <div className="container mx-auto p-4 text-center">멘토 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">멘토 정보를 불러오는데 실패했습니다: {error.message}</div>;
  }

  if (!mentor) {
    return <div className="container mx-auto p-4 text-center">멘토 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{mentor.nickname}님의 멘토 상세 페이지</h1>
      <MentorIntroSection
        nickname={mentor.nickname}
        role={mentor.fieldName}
        experience={mentor.careerDesc}
        mentoringTitle={mentor.mentoringTitle}
        intro={mentor.intro}
        avatarUrl={'../../assets/default_user.png'} // 기본 아바타 이미지 경로
      />

      <MentorReviewList reviews={reviews} />
    </div>
  );
}

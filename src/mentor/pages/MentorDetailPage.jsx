import React, { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Code,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MentorReviewList from "../components/MentorReviewList";
import PaymentSuccessPopup from "../../common/components/PaymentSuccessPopup";
import axios from "../../common/lib/axios";
import defaultAvatar from "../../assets/default_user.png";

export default function MentorDetailPage() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ nickname 안전하게 확보
  const searchParams = new URLSearchParams(location.search);
  const queryNickname = searchParams.get("nickname");
  const nickname = params.nickname || queryNickname;

  const [mentor, setMentor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const showPopup = searchParams.get("paymentSuccess") === "true";
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");
  const orderId = searchParams.get("orderId");

  const handleBook = () => {
    navigate(`/reservation/${mentor.mentorId}`);
  };

  // ✅ 멘토 + 리뷰 정보 가져오기
  useEffect(() => {
    if (!nickname) return;

    const fetchMentorAndReviews = async () => {
      try {
        const mentorRes = await axios.get(`/api/mentors/${nickname}`);
        const fetchedMentor = mentorRes.data;
        setMentor(fetchedMentor);

        if (fetchedMentor?.mentorId) {
          const reviewsRes = await axios.get(
            `/api/mentors/${fetchedMentor.mentorId}/reviews`
          );
          setReviews(reviewsRes.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorAndReviews();
  }, [nickname]);

  
  // ✅ paymentKey 등의 조건만 체크
  const reservationTime = searchParams.get("reservationTime"); // ✅ URL 쿼리에서 가져오기
  useEffect(() => {
    if (mentor?.mentorId &&paymentKey && amount && orderId && nickname) {
      const reserveAfterPayment = async () => {
        try {
          const res = await axios.post(
            "/api/payments/toss/reserve",
            { orderId, paymentKey, amount: Number(amount),reservationTime,mentorId: mentor.mentorId, },
            { withCredentials: true }
          );

          navigate(`/mentors/${nickname}`, {
            replace: true,
            state: {
              fromPaymentSuccess: true,
              paymentData: res.data,
            },
          });
        } catch (err) {
          console.error("결제 처리 실패:", err);
          alert("결제 처리 중 오류가 발생했습니다.");
          navigate(`/mentors/${nickname}`, { replace: true });
        }
      };

      reserveAfterPayment();
    }
  },  [mentor, paymentKey, amount, orderId, reservationTime, nickname]); // ✅ 의존성도 수정
  // [mentor, paymentKey, amount, orderId]);

  // ✅ 새로고침 대비 → 상태 기반 팝업 띄우기
  useEffect(() => {
    const state = location.state;
    if (state?.fromPaymentSuccess && state.paymentData && !popupVisible) {
      setPaymentData(state.paymentData);
      setPopupVisible(true);
    }
  }, [location.state, popupVisible]);

  const closePopup = () => {
    setPopupVisible(false);
    navigate(`/mentors/${nickname}`, { replace: true });
  };

  if (loading)
    return <div className="text-center mt-8">멘토 정보를 불러오는 중...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        멘토 정보 오류: {error.message}
      </div>
    );
  if (!mentor)
    return (
      <div className="text-center mt-8">멘토 정보를 찾을 수 없습니다.</div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ─── 좌측: 프로필, 평점, 버튼, 액션 ─── */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <img
                src={mentor.avatarUrl || defaultAvatar}
                alt={`${mentor.nickname} 아바타`}
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
                className="w-32 h-32 rounded-full border-2 border-purple-600 mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{mentor.nickname}</h2>
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 text-yellow-400" />
                <span className="ml-1 font-semibold">{mentor.avgRating}</span>
                <span className="ml-1 text-gray-500">
                  ({reviews.length}개 리뷰)
                </span>
              </div>

              <button
                onClick={handleBook}
                className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 mb-4"
              >
                멘토 예약하기
              </button>

              <div className="flex space-x-6 text-gray-500 text-sm">
                <button
                  onClick={() => console.log("공유")}
                  className="flex items-center hover:text-gray-700"
                >
                  <Share2 className="w-4 h-4 mr-1" /> 공유하기
                </button>
                <button
                  onClick={() => console.log("찜")}
                  className="flex items-center hover:text-gray-700"
                >
                  <Heart className="w-4 h-4 mr-1" /> 찜하기
                </button>
                <button
                  onClick={() => console.log("메시지")}
                  className="flex items-center hover:text-gray-700"
                >
                  <MessageCircle className="w-4 h-4 mr-1" /> 메시지
                </button>
              </div>
            </div>

            {/* ─── 우측: 소개, 경력, 기술 스택 ─── */}
            <div className="space-y-8">
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <User className="w-5 h-5 text-purple-600 mr-2" /> 멘토 소개
                </h3>
                <p className="text-gray-700 leading-relaxed">{mentor.intro}</p>
              </div>

              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Briefcase className="w-5 h-5 text-purple-600 mr-2" /> 경력
                  사항
                </h3>
                <ul className="space-y-4 ml-4">
                  {(mentor.careers || []).map((c, i) => (
                    <li key={i}>
                      <p className="font-medium">{c.title}</p>
                      <p className="text-gray-500 text-sm">{c.period}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Code className="w-5 h-5 text-purple-600 mr-2" /> 기술 스택
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(mentor.skills || []).map((s) => (
                    <span
                      key={s}
                      className="text-sm px-3 py-1 border border-gray-300 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MentorReviewList reviews={reviews} />

      {popupVisible && paymentData && (
        <PaymentSuccessPopup data={paymentData} onClose={closePopup} />
      )}
    </div>
  );
}

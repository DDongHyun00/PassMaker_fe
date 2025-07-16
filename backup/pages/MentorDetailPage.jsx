// src/mentor/pages/MentorDetailPage.jsx

import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import PaymentSuccessPopup from "../../common/components/PaymentSuccessPopup";
import axios from "axios";

const MentorDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const queryMentorId = query.get("mentorId");
  const { mentorId: paramMentorId } = useParams();
  const mentorId = paramMentorId || queryMentorId;

  const [popupVisible, setPopupVisible] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const showPopup = query.get("paymentSuccess") === "true";

  // ✅ Toss 결제 성공 후 → 예약 + 결제 저장 요청
  useEffect(() => {
    const paymentKey = query.get("paymentKey");
    const amount = query.get("amount");
    const orderId = query.get("orderId"); // ✅ orderId 사용 방식으로 변경

    if (paymentKey && amount && orderId) {
      const reserveAndConfirm = async () => {
        try {
          const res = await axios.post(
              "http://localhost:8080/api/payments/toss/reserve",
              {
                orderId,             // ✅ 백엔드에서 orderId 기반 예약 파싱
                paymentKey,
                amount: Number(amount),
              },
              { withCredentials: true }
          );

          setPaymentData(res.data);
          setPopupVisible(true);

          // ✅ 결제 성공 후 → paymentSuccess 쿼리로 다시 이동
          navigate(`/mentors/${mentorId}?paymentSuccess=true`, {
            replace: true,
            state: { paymentData: res.data },
          });
        } catch (err) {
          console.error("결제 처리 실패:", err);
          alert("결제 처리 중 오류가 발생했습니다.");
          navigate(`/mentors/${mentorId}`, { replace: true });
        }
      };

      reserveAndConfirm();
    }
  }, [mentorId]);

  // ✅ 새로고침 등으로 상태 날아간 경우에도 팝업 다시 표시
  useEffect(() => {
    if (showPopup && location.state?.paymentData && !popupVisible) {
      setPaymentData(location.state.paymentData);
      setPopupVisible(true);
    }
  }, [showPopup, location.state, popupVisible]);

  // ✅ 팝업 닫기
  const closePopup = () => {
    setPopupVisible(false);
    navigate(`/mentors/${mentorId}`, { replace: true }); // 쿼리 제거
  };

  return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">멘토 상세페이지</h2>
        <div className="mb-6">여기에 멘토 정보가 들어갑니다.</div>

        <Link to={`/reservation/${mentorId}`}>
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            예약하기
          </button>
        </Link>

        {/* ✅ 결제 완료 시 팝업 띄우기 */}
        {showPopup && popupVisible && paymentData && (
            <PaymentSuccessPopup data={paymentData} onClose={closePopup} />
        )}
      </div>
  );
};

export default MentorDetailPage;

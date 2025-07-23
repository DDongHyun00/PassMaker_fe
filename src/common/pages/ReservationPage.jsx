import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/customCalendar.css";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import authApi from "../../common/lib/axios.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const ReservationPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [mentorNickname, setMentorNickname] = useState(""); // ✅ 추가

  const { mentorId } = useParams();

  const mockUser = {
    name: "김민수",
    email: "martinkim99@daum.net",
    phone: "+82 010-5091-8814",
  };

  const mockPrice = 33000;
  const timeSlots = ["13:00~15:00", "16:00~18:00"];

  // ✅ mentorId 기반 mentorNickname 조회
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await authApi.get(
          `/mentors/id/${mentorId}`,
          { withCredentials: true }
        );
        setMentorNickname(res.data.nickname);
      } catch (err) {
        console.error("멘토 닉네임 불러오기 실패", err);
      }
    };

    fetchNickname();
  }, [mentorId]);

  // 예약된 시간 조회
  useEffect(() => {
    const fetchUnavailableTimes = async () => {
      try {
        const res = await authApi.get(
          `/reservations/mentor/${mentorId}/unavailable-times`,
          { withCredentials: true }
        );
        setUnavailableTimes(res.data);
      } catch (err) {
        console.error("예약된 시간 목록 불러오기 실패", err);
        setUnavailableTimes([]);
      }
    };

    fetchUnavailableTimes();
  }, [mentorId]);

  const handleReserve = async () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 모두 선택하세요.");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const timeStr = selectedTime.split("~")[0];
    const safeTime = timeStr.replace(/[:\-T]/g, "");
    const orderId_set = `${dateStr}T${safeTime}`;
    const reservationTime = dayjs.tz(`${dateStr}T${timeStr}:00`, "Asia/Seoul").format("YYYY-MM-DDTHH:mm:ss");
    // dayjs로 Asia/Seoul 기준의 날짜로 명시
    // const reservationTime = dayjs.tz(`${dateStr}T${timeStr}:00`, "Asia/Seoul").toISOString();
    // const reservationTime = `${dateStr}T${timeStr}:00`;

    try {
      // ✅ 중복 예약 체크
      await authApi.post(
        "/reservations/check-duplicate",
        {
          mentorId: Number(mentorId),
          reservationTime,
        },
        { withCredentials: true }
      );
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert("이미 예약된 시간입니다.");
      } else {
        console.error("중복 예약 체크 에러:", err);
        alert("예약 가능 여부 확인 중 문제가 발생했습니다.");
      }
      return;
    }

    try {
      const toss = await loadTossPayments(import.meta.env.VITE_TOSS_CLIENT_KEY);
      const orderId = `reserve_${mentorId}_${orderId_set}`;
      const amount = mockPrice;

      // ✅ Toss 결제 요청
      await toss.requestPayment("카드", {
        amount,
        orderId,
        orderName: "멘토링 예약",
        customerName: mockUser.name,
        successUrl:
          `${window.location.origin}/payment/success` +
          `?orderId=${orderId}` +
          `&amount=${amount}` +
          `&mentorId=${mentorId}` +
          `&nickname=${mentorNickname}` + // ✅ 여기에 포함됨
          `&reservationTime=${reservationTime}`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (err) {
      console.error("예약 또는 결제 에러:", err);
      alert("결제 중 문제가 발생했습니다.");
    }
  };

  const selectedDateStr = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : null;

  const isTimeDisabled = (slot) => {
    if (!selectedDateStr) return false;
    const hour = slot.split(":")[0];
    const fullTime = `${selectedDateStr}T${hour.padStart(2, "0")}:00:00`;
    return unavailableTimes.includes(fullTime);
  };

  return (
    <div className="flex justify-center bg-gray-50 min-h-screen py-12 px-4">
      <div className="w-full max-w-[1200px] bg-white rounded-lg shadow p-10 flex flex-col md:flex-row gap-10">
        <div className="md:w-3/5 w-full min-w-[300px]">
          <h2 className="text-2xl font-bold mb-4">멘토링 신청</h2>
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">1. 일정 선택</h3>
            {selectedDate && (
              <p className="text-purple-600 font-semibold mb-1">
                ✅ {selectedDate.toLocaleDateString()} {selectedTime}
              </p>
            )}
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              calendarType="gregory"
              locale="ko-KR"
            />
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium mb-2">시간 선택</div>
            <div className="flex gap-4 flex-wrap">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  disabled={isTimeDisabled(slot)}
                  className={`px-4 py-2 rounded border text-sm font-medium transition-all ${
                    selectedTime === slot
                      ? "bg-purple-500 text-white"
                      : isTimeDisabled(slot)
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:w-2/5 w-full min-w-[300px] border-l md:pl-8">
          <h3 className="text-lg font-semibold mb-4">신청자 정보</h3>
          <div className="text-sm mb-2">이름: {mockUser.name}</div>
          <div className="text-sm mb-2">이메일: {mockUser.email}</div>
          <div className="text-sm mb-2">휴대폰 번호: {mockUser.phone}</div>

          <hr className="my-4" />

          <div className="font-semibold mb-2">
            총 결제 금액:{" "}
            <span className="text-purple-600 font-bold text-lg">
              ₩{mockPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleReserve}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded mt-2"
          >
            결제하기
          </button>

          <div className="text-xs text-gray-500 mt-4 leading-5">
            멘토링 시작{" "}
            <span className="text-red-500 font-semibold">
              30분 전부터는 환불이 불가
            </span>{" "}
            합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;

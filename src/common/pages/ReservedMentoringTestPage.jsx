// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import ReservationList from "../components/ReservationList";
// import EnterCodeModal from "../modal/EnterCodeModal.jsx";
// import ReservationCancelModal from "../modal/ReservationCancelModal.jsx";

// const ReservedMentoringTestPage = () => {
//   const [reservations, setReservations] = useState([]);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [selectedCancel, setSelectedCancel] = useState(null);
//   const [codeInput, setCodeInput] = useState("");
//   const [showCodeModal, setShowCodeModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const navigate = useNavigate();
//   const now = dayjs();

//   // 예약 상태 enum을 한글로 매핑하는 함수
//   const getStatusLabel = (status) => {
//     switch (status) {
//       case "WAITING":
//         return { label: "대기", color: "text-yellow-600" };
//       case "CONFIRMED":
//         return { label: "확정", color: "text-green-600" };
//       case "CANCELLED":
//         return { label: "취소", color: "text-red-600" };
//       case "COMPLETED":
//         return { label: "완료", color: "text-gray-600" };
//       default:
//         return { label: status, color: "text-gray-600" };
//     }
//   };

//   useEffect(() => {
//     axios.get("/api/reservations", { withCredentials: true })
//       .then((res) => {
//         const transformedReservations = res.data.map(r => ({
//           ...r,
//           mentorNickname: r.mentorName, // mentorName을 mentorNickname으로 매핑
//           startedAt: r.reservationTime, // reservationTime을 startedAt으로 사용
//           endedAt: dayjs(r.reservationTime).add(1, 'hour').toISOString(), // reservationTime에 1시간 추가하여 endedAt 생성 (임시)
//           statusLabel: getStatusLabel(r.status).label, // status enum을 한글로 변환
//           statusColor: getStatusLabel(r.status).color, // status에 따른 색상 추가
//         }));
//         setReservations(transformedReservations);
//       })
//       .catch(error => {
//         console.error("API error:", error);
//       });
//   }, []);

//   const upcoming = reservations.filter((r) => dayjs(r.endedAt).isAfter(now));
//   const completed = reservations.filter((r) => dayjs(r.endedAt).isBefore(now));

//   const handleEnterClick = (res) => {
//     setSelectedRoom(res);
//     setCodeInput("");
//     setShowCodeModal(true);
//   };

//   const handleConfirmCode = async () => {
//     if (!selectedRoom) return;
//     const canEnter = now.isAfter(dayjs(selectedRoom.startedAt)) && now.isBefore(dayjs(selectedRoom.endedAt));
//     if (!canEnter) return alert("입장 가능한 시간이 아닙니다.");
//     try {
//       const { data } = await axios.post(
//         `/api/rooms/${selectedRoom.roomId}/enter`,
//         { roomCode: codeInput },
//         { withCredentials: true }
//       );
//       navigate(`/mentoringroom/${selectedRoom.roomId}`, { state: data });
//     } catch (e) {
//       alert("입장 실패: " + (e.response?.data?.message || e.message));
//     }
//   };

//   const handleCancelClick = (res) => {
//     setSelectedCancel(res);
//     setShowCancelModal(true);
//   };

//   const handleConfirmCancel = async () => {
//     if (!selectedCancel) return;
//     try {
//       await axios.patch(
//         `/api/reservations/${selectedCancel.reservationId}/cancel`,
//         {},
//         { withCredentials: true }
//       );
//       // 예약 삭제 대신 상태를 'CANCELLED'로 업데이트
//       setReservations((prev) =>
//         prev.map((r) =>
//           r.reservationId === selectedCancel.reservationId
//             ? { ...r, status: "CANCELLED", statusLabel: getStatusLabel("CANCELLED").label, statusColor: getStatusLabel("CANCELLED").color }
//             : r
//         )
//       );
//       setShowCancelModal(false);
//     } catch (e) {
//       alert("취소 실패: " + (e.response?.data?.message || e.message));
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen pt-20 px-4">
//       <ReservationList
//         title="예약된 멘토링"
//         items={upcoming}
//         onEnter={handleEnterClick}
//         onCancel={handleCancelClick}
//         isCompleted={false}
//       />
//       <ReservationList
//         title="완료된 멘토링"
//         items={completed}
//         isCompleted={true}
//       />

//       {/* 예약 취소 모달 */}
//       {showCancelModal && (
//         <ReservationCancelModal
//           visible={showCancelModal}
//           onClose={() => setShowCancelModal(false)}
//           onCancel={handleConfirmCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default ReservedMentoringTestPage;

// 내용 중복으로 주석처리
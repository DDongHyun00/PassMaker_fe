// import React, { useState } from "react";
// import Modal from "./MyPageModal";

// const ReservationCancelModal = ({ visible, onClose, onCancel }) => {
//   if (!visible) return null;
//   const [inputText, setInputText] = useState("");
//   const isConfirmed = inputText === "동의합니다";

//   const handleClick = () => {
//     if (isConfirmed) {
//       onCancel();
//     } else {
//       alert("동의합니다를 정확히 입력해주세요.");
//     }
//   };

//   return (
//     <Modal onClose={onClose}>
//       <h3 className="text-xl font-bold mb-4">예약 취소 확인</h3>
//       <p className="text-sm mb-4">
//         예약을 취소하려면 "동의합니다"를 입력 후 신청 취소 버튼을 눌러주세요.
//       </p>
//       <input
//         type="text"
//         placeholder="동의합니다"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//         className="border p-2 rounded w-full mb-4"
//       />
//       <div className="flex justify-end gap-2">
//         <button
//           onClick={handleClick}
//           disabled={!isConfirmed}
//           className={`px-4 py-2 rounded text-white ${
//             isConfirmed ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           신청 취소
//         </button>
//         <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
//           취소
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default ReservationCancelModal;

// 내용 중복으로 주석처리
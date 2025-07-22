// import React from "react";

// const EnterCodeModal = ({ visible, onClose, codeInput, onChange, onConfirm }) => {
//   if (!visible) return null;
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded shadow-md w-80">
//         <h3 className="text-lg font-bold mb-2">비밀코드 입력</h3>
//         <input
//           type="text"
//           value={codeInput}
//           onChange={onChange}
//           placeholder="비밀코드를 입력하세요"
//           className="border p-2 rounded w-full mb-4"
//         />
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             취소
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//           >
//             입장
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnterCodeModal;

// 내용 중복으로 주석처리
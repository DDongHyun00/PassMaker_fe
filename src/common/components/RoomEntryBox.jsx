import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoomEntryBox = () => {
  const [roomId, setRoomId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleEnterRoom = async () => {
    try {
      const res = await axios.post(
        `/rooms/${roomId}/enter`,
        { roomCode },
        { withCredentials: true }
      );
      const data = res.data;
      navigate(`/mentoringroom/${roomId}`, { state: data });
    } catch (err) {
      alert("입장 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">멘토링방 입장하기</h2>
      <input
        type="text"
        placeholder="roomId 입력"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="text"
        placeholder="비밀코드 입력"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={handleEnterRoom}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        입장하기
      </button>
    </div>
  );
};

export default RoomEntryBox;

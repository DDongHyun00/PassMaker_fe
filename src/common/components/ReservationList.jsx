import React from "react";
import ReservationItem from "./ReservationItem";

const ReservationList = ({ title, items, onEnter, onCancel, isCompleted }) => (
  <div>
    <h2 className="text-xl font-bold mt-6 mb-4">{title}</h2>
    {items.length === 0 ? (
      <p>{title === "예약된 멘토링" ? "예약된 멘토링이 없습니다." : "완료된 멘토링이 없습니다."}</p>
    ) : (
      items.map((r) => (
        <ReservationItem
          key={r.reservationId}
          reservation={r}
          onEnter={onEnter}
          onCancel={onCancel}
          isCompleted={isCompleted}
        />
      ))
    )}
  </div>
);

export default ReservationList;
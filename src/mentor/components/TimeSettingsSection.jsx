import React, { useState } from 'react';

// [수정] data와 onChange 대신, availableTimes와 setSettings를 받도록 변경
const TimeSettingsSection = ({ availableTimes, setSettings }) => {
  const [newDayOfWeek, setNewDayOfWeek] = useState('MONDAY');
  const [newStartTime, setNewStartTime] = useState('09:00');
  const [newEndTime, setNewEndTime] = useState('18:00');

  const daysOfWeek = [
    { value: 'MONDAY', label: '월요일' },
    { value: 'TUESDAY', label: '화요일' },
    { value: 'WEDNESDAY', label: '수요일' },
    { value: 'THURSDAY', label: '목요일' },
    { value: 'FRIDAY', label: '금요일' },
    { value: 'SATURDAY', label: '토요일' },
    { value: 'SUNDAY', label: '일요일' },
  ];

  const handleAddSlot = () => {
    if (newStartTime && newEndTime) {
      const newSlot = {
        dayOfWeek: newDayOfWeek,
        startTime: newStartTime,
        endTime: newEndTime,
      };
      // 중복 체크 (동일 요일, 동일 시간대)
      const isDuplicate = availableTimes.some(slot =>
        slot.dayOfWeek === newSlot.dayOfWeek &&
        slot.startTime === newSlot.startTime &&
        slot.endTime === newSlot.endTime
      );

      if (isDuplicate) {
        alert('이미 추가된 시간대입니다.');
        return;
      }

      const updatedTimes = [...availableTimes, newSlot];
      setSettings(prev => ({ ...prev, availableTimes: updatedTimes }));
    }
  };

  const handleRemoveSlot = (indexToRemove) => {
    const updatedTimes = availableTimes.filter((_, index) => index !== indexToRemove);
    setSettings(prev => ({ ...prev, availableTimes: updatedTimes }));
  };

  return (
    <section className="border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">멘토링 가능 시간 설정</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={newDayOfWeek}
          onChange={(e) => setNewDayOfWeek(e.target.value)}
          className="border p-2 rounded-md"
        >
          {daysOfWeek.map(day => (
            <option key={day.value} value={day.value}>{day.label}</option>
          ))}
        </select>
        <input
          type="time"
          value={newStartTime}
          onChange={(e) => setNewStartTime(e.target.value)}
          className="border p-2 rounded-md"
        />
        <input
          type="time"
          value={newEndTime}
          onChange={(e) => setNewEndTime(e.target.value)}
          className="border p-2 rounded-md"
        />
        <button
          onClick={handleAddSlot}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md col-span-full md:col-span-1"
        >
          시간대 추가
        </button>
      </div>

      <div className="space-y-2">
        {availableTimes.map((slot, index) => (
          <div key={index} className="flex items-center justify-between bg-purple-50 p-3 rounded-md">
            <span>
              {daysOfWeek.find(day => day.value === slot.dayOfWeek)?.label}: {slot.startTime} - {slot.endTime}
            </span>
            <button
              onClick={() => handleRemoveSlot(index)}
              className="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">* 멘토링 가능한 요일과 시간을 설정해주세요.</p>
    </section>
  );
};

export default TimeSettingsSection;

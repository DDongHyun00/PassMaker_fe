import React, { useState, useEffect } from 'react';
import authApi from '../../common/lib/axios';
import MyPageButton from '../../common/components/MyPageButton';

const MentorAvailableTimes = ({ mentorId, onSuccess }) => {
    const [availableSlots, setAvailableSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({
        dayOfWeek: '',
        startTime: '',
        endTime: '',
    });

    // 1) 멘토 시간 불러오기(GET)
    useEffect(() => {
        if (!mentorId) return;
        authApi.get(`/mentors/${mentorId}/available-time`)
            .then(res => {
                setAvailableSlots(res.data.savedSlots || []);
            })
            .catch(err => {
                console.error("멘토링 가능 시간 조회 실패", err);
            });
    }, [mentorId]);

    const handleSlotChange = (e) => {
        setNewSlot({
            ...newSlot,
            [e.target.name]: e.target.value,
        });
    };

    // 2) 새 슬롯 UI에 추가 (임시 상태에 추가만)
    const handleAddSlot = () => {
        if (!newSlot.dayOfWeek || !newSlot.startTime || !newSlot.endTime) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        setAvailableSlots([...availableSlots, { ...newSlot, id: Date.now() }]);
        setNewSlot({ dayOfWeek: '', startTime: '', endTime: '' });
    };

    // 3) 슬롯 삭제 (임시 상태에서만 제거)
    const handleDeleteSlot = (slotId) => {
        setAvailableSlots(availableSlots.filter(slot => slot.id !== slotId));
    };

    // 4) 전체 저장 (PUT) — 백엔드 스펙에 맞춰 한번에 보냄
    const handleSave = () => {
        // id는 보내지 말고, 필요한 필드만 매핑
        const availableSlotsForRequest = availableSlots.map(({ dayOfWeek, startTime, endTime }) => ({
            dayOfWeek,
            startTime,
            endTime,
        }));

        authApi.put(`/mentors/${mentorId}/available-time`, {
            mentorId,
            availableSlots: availableSlotsForRequest,
        })
        .then(() => {
            alert("시간 저장 성공");
            if(onSuccess) onSuccess();
        })
        .catch(err => {
            console.error("시간 저장 실패", err);
            alert("시간 저장에 실패했습니다.");
        });
    };

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold mb-2">현재 설정된 시간</h4>
                {availableSlots.length === 0 ? (
                    <p className="text-gray-500">설정된 멘토링 가능 시간이 없습니다.</p>
                ) : (
                    <ul className="space-y-2">
                        {availableSlots.map(slot => (
                            <li key={slot.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span>{slot.dayOfWeek}: {slot.startTime} - {slot.endTime}</span>
                                <MyPageButton onClick={() => handleDeleteSlot(slot.id)} className="text-red-600 text-sm">삭제</MyPageButton>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h4 className="font-semibold mb-2">새로운 시간 추가</h4>
                <div className="grid grid-cols-3 gap-2 mb-2">
                    <select
                        name="dayOfWeek"
                        value={newSlot.dayOfWeek}
                        onChange={handleSlotChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">요일 선택</option>
                        <option value="MONDAY">월요일</option>
                        <option value="TUESDAY">화요일</option>
                        <option value="WEDNESDAY">수요일</option>
                        <option value="THURSDAY">목요일</option>
                        <option value="FRIDAY">금요일</option>
                        <option value="SATURDAY">토요일</option>
                        <option value="SUNDAY">일요일</option>
                    </select>
                    <input
                        type="time"
                        name="startTime"
                        value={newSlot.startTime}
                        onChange={handleSlotChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <input
                        type="time"
                        name="endTime"
                        value={newSlot.endTime}
                        onChange={handleSlotChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <MyPageButton onClick={handleAddSlot}>시간 추가</MyPageButton>
            </div>

            <div>
                <MyPageButton onClick={handleSave} className="w-full mt-4">저장하기</MyPageButton>
            </div>
        </div>
    );
};

export default MentorAvailableTimes;

'use client';
import { useState } from 'react';
import { format } from 'date-fns';

interface TimeSlotData {
  date: string;
  startTime: string;
  endTime: string;
}

const useTimeSlot = () => {
  const [date, setDate] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<TimeSlotData[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /** Calender 열기 */
  const handleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  /** 예약날짜 추가 */
  const handleFormatDayClick = (day: Date) => {
    setSelectedDay(format(day, 'yy/MM/dd'));
    setDate(format(day, 'yyyy-MM-dd'));
    setIsCalendarOpen(false);
  };

  /** 예약 시간대 추가 */
  const handleAddTimeSlot = () => {
    if (date && startTime && endTime) {
      const newTimeSlot = { date, startTime, endTime };
      setTimeSlots((prevSlots) => [...prevSlots, newTimeSlot]);
      setDate('');
      setSelectedDay('');
      setStartTime('');
      setEndTime('');
      setIsCalendarOpen(false);
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  /** 이미지 삭제 처리 */
  const handleDeleteTimeSlot = (index: number) => {
    setTimeSlots((prev) => prev.filter((_, idx) => idx !== index));
  };

  return {
    date,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    timeSlots,
    isCalendarOpen,
    handleCalendarOpen,
    handleFormatDayClick,
    handleAddTimeSlot,
    handleDeleteTimeSlot,
  };
};

export default useTimeSlot;

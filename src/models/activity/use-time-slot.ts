'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { TimeSlotData } from '@/types/activity';

const useTimeSlot = () => {
  const [date, setDate] = useState<string>();
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [schedules, setSchedules] = useState<TimeSlotData[] | []>([]);
  const [addschedules, setAddSchedules] = useState<TimeSlotData[] | []>([]);
  const [scheduleIds, setScheduleIds] = useState<number[]>([]);
  const [deletedSchedule, setDeletedschedule] = useState<number[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

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
  const handleAddSchedules = () => {
    if (date && startTime && endTime) {
      const newTimeSlot = { date, startTime, endTime };
      setSchedules((prevSlots) => [...prevSlots, newTimeSlot]);
      setAddSchedules((prevSlots) => [...prevSlots, newTimeSlot]);
      setDate('');
      setSelectedDay('');
      setStartTime('');
      setEndTime('');
      setIsCalendarOpen(false);
    } else {
      alert('모든 필드를 채워주세요.');
    }
  };

  /** 시간대 삭제 처리 */
  const handleDeleteSchedules = (index: number) => {
    const deletedScheduleId = schedules[index]?.id;
    setSchedules((prev) => prev.filter((_, idx) => idx !== index));
    setAddSchedules((prev) => prev.filter((_, idx) => idx !== index));
    if (deletedScheduleId !== undefined) {
      setDeletedschedule((prev) => [...prev, deletedScheduleId]);
    }

    setScheduleIds((prev) => prev.filter((id) => id !== deletedScheduleId));
  };

  return {
    date,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    schedules,
    setSchedules,
    addschedules,
    deletedSchedule,
    scheduleIds,
    setScheduleIds,
    isCalendarOpen,
    handleCalendarOpen,
    handleFormatDayClick,
    handleAddSchedules,
    handleDeleteSchedules,
  };
};

export default useTimeSlot;

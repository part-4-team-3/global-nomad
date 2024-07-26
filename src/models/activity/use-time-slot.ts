'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { TimeSlotData } from '@/types/activity';
import { toast } from 'react-toastify';

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

  /** 날짜 선택 */
  const handleFormatDayClick = (day: Date) => {
    const selectedDate = format(day, 'yyyy-MM-dd');
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate >= today) {
      setSelectedDay(format(day, 'yy/MM/dd'));
      setDate(selectedDate);
      setIsCalendarOpen(false);
    } else {
      toast('선택된 날짜는 오늘 이후여야 합니다.');
    }
  };

  /** 시간 비교를 위한 유틸리티 함수 */
  const isValidTimeRange = (start: string, end: string): boolean => {
    return start < end;
  };

  /** startTime을 업데이트할 때 유효성 검사를 수행 */
  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStartTime = event.target.value;
    if (isValidTimeRange(newStartTime, endTime) || endTime === '') {
      setStartTime(newStartTime);
    } else {
      toast('시작 시간은 종료 시간보다 이전이어야 합니다.');
    }
  };

  /**  endTime을 업데이트할 때 유효성 검사를 수행 */
  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEndTime = event.target.value;
    if (isValidTimeRange(startTime, newEndTime) || startTime === '') {
      setEndTime(newEndTime);
    } else {
      toast('종료 시간은 시작 시간보다 이후이어야 합니다.');
    }
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
      toast('모든 필드를 채워주세요.');
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
    handleStartTimeChange,
    handleEndTimeChange,
  };
};

export default useTimeSlot;

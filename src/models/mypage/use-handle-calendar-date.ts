import { useState } from 'react';

/**
 * 달력 날짜를 관리하는 커스텀 훅입니다.
 *
 * 이 훅은 `useState`를 사용하여 현재 날짜를 상태로 관리하고,
 * 이전 달 및 다음 달로 이동할 수 있는 핸들러를 제공합니다.
 *
 * @returns date: 현재 날짜, handlePrevMonth: 이전 달로 이동하는 핸들러 함수, handleNextMonth: 다음 달로 이동하는 핸들러 함수
 */
export function useHandleCalendarDate() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // 현재 날짜를 이전 달로 이동시키는 함수입니다.
  const handlePrevMonth = () => {
    setDate((prev) => {
      const newDate = prev ? new Date(prev) : undefined;
      newDate?.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // 현재 날짜를 다음 달로 이동시키는 함수입니다.
  const handleNextMonth = () => {
    setDate((prev) => {
      const newDate = prev ? new Date(prev) : undefined;
      newDate?.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return { date, handlePrevMonth, handleNextMonth };
}

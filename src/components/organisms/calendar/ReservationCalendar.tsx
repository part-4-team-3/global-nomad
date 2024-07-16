'use client';

import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';
import React from 'react';
import { useGetMyActivitiesByMonth } from '@/queries/myActivities/get-activities-month';
import { useHandleCalendarDate } from '@/models/mypage/use-handle-calendar-date';

interface Props {
  activityId: number;
}

export default function ReservationCalendar({ activityId }: Props) {
  const { date, handlePrevMonth, handleNextMonth } = useHandleCalendarDate();

  const { data: myActivitiesByMonth } = useGetMyActivitiesByMonth(
    activityId,
    date?.getFullYear().toString()!,
    (date?.getMonth()! + 1).toString()!,
  );

  return (
    <UIReservationCalendar
      mode="single"
      className="h-full w-full rounded-md border"
      activitiesByMonth={myActivitiesByMonth?.data}
      onChangePrevMonth={handlePrevMonth}
      onChangeNextMonth={handleNextMonth}
    />
  );
}

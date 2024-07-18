'use client';

import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';
import React from 'react';
import { useGetMyActivitiesByMonth } from '@/queries/myActivities/get-activities-month';
import { useHandleCalendarDate } from '@/models/mypage/use-handle-calendar-date';
import { formatDateYYYYMMDD } from '@/lib/formatDate';
import ReservationInfoModal from '@/components/templates/mypage/ReservationInfoModal';

interface Props {
  activityId: number;
  isOpen: boolean;
}

export default function ReservationCalendar({ activityId, isOpen }: Props) {
  const { date, setDate, handlePrevMonth, handleNextMonth } = useHandleCalendarDate();

  const { data: myActivitiesByMonth } = useGetMyActivitiesByMonth(
    activityId,
    date?.getFullYear().toString()!,
    (date?.getMonth()! + 1).toString()!,
  );

  return (
    <div className="relative">
      <UIReservationCalendar
        mode="single"
        className="h-full w-full rounded-md border"
        setDate={setDate}
        activitiesByMonth={myActivitiesByMonth?.data}
        onChangePrevMonth={handlePrevMonth}
        onChangeNextMonth={handleNextMonth}
      />

      {isOpen && (
        <div className="absolute right-[0] top-[0] h-screen w-screen">
          <ReservationInfoModal activityId={activityId} date={formatDateYYYYMMDD(date!)} />
        </div>
      )}
    </div>
  );
}

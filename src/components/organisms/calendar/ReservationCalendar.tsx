'use client';

import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';
import React from 'react';
import { useGetMyActivitiesByMonth } from '@/queries/myActivities/get-activities-month';
import { useHandleCalendarDate } from '@/models/mypage/use-handle-calendar-date';
import { formatDateYYYYMMDD } from '@/lib/formatDate';
import ReservationInfoModal from '@/components/templates/mypage/ReservationInfoModal';
import { cn } from '@/lib/tailwind-utils';

interface Props {
  activityId: number;
  isOpen: boolean;
}

export default function ReservationCalendar({ activityId, isOpen }: Props) {
  const { date, setDate, handlePrevMonth, handleNextMonth } = useHandleCalendarDate();

  const { data: myActivitiesByMonth, refetch: myActivitiesByMonthRefetch } =
    useGetMyActivitiesByMonth(
      activityId,
      date?.getFullYear().toString()!,
      (date?.getMonth()! + 1).toString()!,
    );

  return (
    <div className="relative">
      <UIReservationCalendar
        mode="single"
        className={cn('h-full w-full rounded-md border', isOpen && 'hidden md:hidden lg:block')}
        setDate={setDate}
        activitiesByMonth={myActivitiesByMonth?.data}
        onChangePrevMonth={handlePrevMonth}
        onChangeNextMonth={handleNextMonth}
      />

      {isOpen && (
        <div className="h-full w-full px-[-16px] md:mt-100pxr lg:absolute lg:right-[0] lg:top-[22px] lg:h-670pxr lg:w-429pxr">
          <ReservationInfoModal
            activityId={activityId}
            date={formatDateYYYYMMDD(date!)}
            myActivitiesByMonthRefetch={myActivitiesByMonthRefetch}
          />
        </div>
      )}
    </div>
  );
}

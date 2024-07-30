'use client';

import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';
import React from 'react';
import { useGetMyActivitiesByMonth } from '@/queries/myActivities/get-activities-month';
import { useHandleCalendarDate } from '@/models/mypage/use-handle-calendar-date';
import { formatDateYYYYMMDD } from '@/lib/formatDate';
import ReservationInfoModal from '@/components/templates/mypage/ReservationInfoModal';
import { cn } from '@/lib/tailwind-utils';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

interface Props {
  activityId: number;
  isOpen: boolean;
  myReservationByMonth: any;
}

export default function ReservationCalendar({ activityId, isOpen, myReservationByMonth }: Props) {
  const searchParams = useSearchParams();
  let curDate;
  const year = searchParams.get('year');
  let month = searchParams.get('month');

  if (Number(month) < 0 || Number(month) > 12) {
    const nowDate = new Date();
    month = (nowDate?.getMonth()! + 1).toString()!.padStart(2, '0');
  }
  if (!year || !month) {
    curDate = new Date();
  } else {
    curDate = new Date(Number(year), Number(month) - 1);
  }

  const { date, setDate, handlePrevMonth, handleNextMonth } = useHandleCalendarDate(curDate);

  return (
    <div className="relative">
      <UIReservationCalendar
        mode="single"
        date={date}
        className={cn('h-full w-full rounded-md border', isOpen && 'hidden md:hidden lg:block')}
        setDate={setDate}
        activitiesByMonth={myReservationByMonth}
        onChangePrevMonth={handlePrevMonth}
        onChangeNextMonth={handleNextMonth}
        activityId={activityId}
      />

      {isOpen && (
        <div className="h-full w-full px-[-16px] md:mt-100pxr lg:absolute lg:right-[0] lg:top-[22px] lg:h-670pxr lg:w-429pxr">
          <ReservationInfoModal activityId={activityId} date={formatDateYYYYMMDD(date!)} />
        </div>
      )}
    </div>
  );
}

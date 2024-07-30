'use client';

import InfinitySelect from '@/components/molecules/select/InfinityScrollSelect';
import ReservationCalendar from '@/components/organisms/calendar/ReservationCalendar';
import { cn } from '@/lib/tailwind-utils';
import { useModal } from '@/store/useModal';
import { Activity, MyActivityList } from '@/types/activity';

interface Props {
  myActivityList: MyActivityList | null;
  activityId: number | null;
  selectedActivity: Activity | null;
  myReservationByMonth: any;
}

export default function MyReservation({
  myReservationByMonth,
  myActivityList,
  selectedActivity,
}: Props) {
  const { isOpen } = useModal();

  return (
    <div
      className={cn(
        'items-left flex w-full flex-col justify-center',
        isOpen && 'items-left flex w-full flex-col justify-center px-[0px]',
      )}
    >
      <div className={cn('flex w-full flex-col', isOpen && 'hidden w-full md:block')}>
        <h1 className="text-32pxr font-[700] text-[#000]">예약 현황</h1>
        <div className="relative mt-34pxr w-full">
          <p className="absolute left-[20px] top-[-10px] z-10 bg-white text-14pxr font-[400]">
            체험명
          </p>
          <InfinitySelect
            options={myActivityList?.activities ? myActivityList.activities : []}
            value={selectedActivity?.title || ''}
            activityId={selectedActivity?.id || ''}
          />
        </div>
      </div>
      <div className={cn('relative mt-30pxr w-full', isOpen && 'mt-[0px]')}>
        {selectedActivity && (
          <ReservationCalendar
            activityId={selectedActivity?.id}
            isOpen={isOpen}
            myReservationByMonth={myReservationByMonth}
          />
        )}
      </div>
    </div>
  );
}

'use client';

import InfinitySelect from '@/components/molecules/select/InfinityScrollSelect';
import ReservationCalendar from '@/components/organisms/calendar/ReservationCalendar';
import { cn } from '@/lib/tailwind-utils';
import { useHandleIsSelectdActivity } from '@/models/mypage/use-handle-selected-activity';
import { useModal } from '@/store/useModal';
import { MyActivityList } from '@/types/activity';

interface Props {
  myActivityList: MyActivityList;
}

export default function MyReservation({ myActivityList }: Props) {
  const { isOpen } = useModal();

  const { selectedActivity, setSelectedActivity } = useHandleIsSelectdActivity(
    myActivityList.activities,
  );

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
          <p className="before:left:-[0px] absolute left-[20px] top-[-10px] z-10 text-14pxr font-[400] before:absolute before:top-[0px] before:-z-10 before:block before:h-13pxr before:w-full before:bg-var-gray8">
            체험명
          </p>
          <InfinitySelect
            options={myActivityList.activities ? myActivityList.activities : []}
            value={selectedActivity?.title}
            selectedActivity={selectedActivity}
            onChange={setSelectedActivity}
          />
        </div>
      </div>
      <div className={cn('relative mt-60pxr w-full', isOpen && 'mt-50pxr')}>
        {selectedActivity && (
          <ReservationCalendar activityId={selectedActivity?.id} isOpen={isOpen} />
        )}
      </div>
    </div>
  );
}

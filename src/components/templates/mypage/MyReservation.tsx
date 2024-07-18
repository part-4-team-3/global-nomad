'use client';

import page from '@/app/(main)/(protected)/calendar/page';
import InfinitySelect from '@/components/molecules/select/InfinityScrollSelect';
import Select from '@/components/molecules/select/Select';
import ReservationCalendar from '@/components/organisms/calendar/ReservationCalendar';
import { cn } from '@/lib/tailwind-utils';
import { useHandleIsSelectdActivity } from '@/models/mypage/use-handle-selected-activity';
import { useGetMyActivityList } from '@/queries/myActivities/get-myactivities';
import { useModal } from '@/store/useModal';

const GET_SIZE = 5;

export default function MyReservation() {
  const { isOpen } = useModal();
  const {
    data: myActivityResponse,
    isLoading,
    fetchNextPage,
  } = useGetMyActivityList({
    size: GET_SIZE,
    cursorId: null,
  });

  const myActivityList = myActivityResponse?.pages.flatMap((page) => page.data.activities);

  const { activityName, activityNameList, selectedActivity, setActivityName } =
    useHandleIsSelectdActivity(myActivityList);

  return (
    <div
      className={cn(
        'items-left flex w-full flex-col justify-center px-16pxr',
        isOpen && 'items-left flex w-full flex-col justify-center px-[0px]',
      )}
    >
      <div className={cn('flex w-full flex-col', isOpen && 'hidden w-full')}>
        <h1 className="text-32pxr font-[700] text-[#000]">예약 현황</h1>
        <div className="relative mt-34pxr w-full">
          <p className="absolute left-[20px] top-[-10px] z-10 bg-white text-14pxr font-[400]">
            체험명
          </p>
          <InfinitySelect
            isLoading={isLoading}
            fetchNextPage={fetchNextPage}
            options={activityNameList ? activityNameList : []}
            value={activityName}
            onChange={setActivityName}
          />
        </div>
      </div>
      <div className={cn('relative mt-30pxr w-full', isOpen && 'mt-[0px]')}>
        {selectedActivity && (
          <ReservationCalendar activityId={selectedActivity?.id} isOpen={isOpen} />
        )}
      </div>
    </div>
  );
}

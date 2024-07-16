'use client';

import Select from '@/components/molecules/select/Select';
import ReservationCalendar from '@/components/organisms/calendar/ReservationCalendar';
import { useHandleIsSelectdActivity } from '@/models/mypage/use-handle-selected-activity';
import { useGetMyActivityList } from '@/queries/myActivities/get-myactivities';

export default function MyReservation() {
  const { data: myActivityResponse } = useGetMyActivityList({ size: 20, cursorId: null });
  const myActivityList = myActivityResponse?.data.activities;

  const { activityName, activityNameList, selectedActivity, setActivityName } =
    useHandleIsSelectdActivity(myActivityList);

  return (
    <div className="items-left flex max-w-343pxr flex-col justify-center md:max-w-429pxr lg:max-w-792pxr">
      <h1 className="text-32pxr font-[700] text-[#000]">예약 현황</h1>
      <div className="relative mt-34pxr w-full">
        <p className="absolute left-[20px] top-[-10px] z-10 bg-white text-14pxr font-[400]">
          체험명
        </p>
        <Select
          options={activityNameList ? activityNameList : []}
          value={activityName}
          onChange={setActivityName}
        />
      </div>
      <div className="mt-30pxr w-full">
        {selectedActivity && <ReservationCalendar activityId={selectedActivity?.id} />}
      </div>
    </div>
  );
}

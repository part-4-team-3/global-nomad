import Select from '@/components/molecules/select/Select';
import ReservationCardList from '@/components/organisms/card-list/ReservationCardList';
import { useHandleSelectedSchedule } from '@/models/mypage/use-handle-selected-schedule';
import { useHandleStatusCount } from '@/models/mypage/use-handle-status-count';
import { useScheduleTimeMapping } from '@/models/mypage/use-schedule-time-mapping';
import { useGetReservationByDate } from '@/queries/myActivities/get-reservation-date';
import { useGetScheduleByDate } from '@/queries/myActivities/get-schedule-date';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  activityId: number;
  date: string;
}

export default function ReservationInfoModal({ activityId, date }: Props) {
  const { setIsClose, key } = useModal();
  const isSelected = key === 'reservation-info';

  const [status, setStatus] = useState<'pending' | 'confirmed' | 'declined'>('pending');

  const { data: myScheduleByDate } = useGetScheduleByDate(activityId, date);
  const { scheduleTimeList } = useScheduleTimeMapping(myScheduleByDate?.data);
  const [selectedScheduleTime, setSelectedScheduleTime] = useState<string>(scheduleTimeList[0]);
  const { selectedSchedule } = useHandleSelectedSchedule(
    myScheduleByDate?.data ?? null,
    selectedScheduleTime,
  );

  const { data: myReservationByTime } = useGetReservationByDate(
    activityId,
    null,
    10,
    selectedSchedule?.scheduleId ?? null,
    status,
  );

  const { statusCount } = useHandleStatusCount(selectedSchedule ?? null);

  const newDate = new Date(date);
  const newDateStr = `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
  console.log(selectedSchedule);
  return (
    <>
      {isSelected && (
        <div className="absolute right-[0] top-[0] flex h-screen w-screen flex-col border border-var-gray6 bg-white p-24pxr md:h-full md:w-full lg:h-697pxr lg:w-429pxr">
          <div className="flex items-center justify-between">
            <h1 className="text-28pxr font-[700]">예약 정보</h1>
            <Image
              className="cursor-pointer"
              src="/close.svg"
              alt="close-btn"
              width={48}
              height={48}
              onClick={setIsClose}
            />
          </div>
          <div className="mt-27pxr flex gap-12pxr border-b border-var-gray6">
            <button className="relative" onClick={() => setStatus('pending')}>
              <h2 className="pb-15pxr">신청 {statusCount.pending}</h2>
              {status === 'pending' && (
                <hr className="absolute bottom-[0] left-[0] h-4pxr w-full rounded-[14px] border-b-4 border-var-green-dark" />
              )}
            </button>
            <button className="relative" onClick={() => setStatus('confirmed')}>
              <h2 className="pb-15pxr">승인 {statusCount.confirmed}</h2>
              {status === 'confirmed' && (
                <hr className="absolute bottom-[0] left-[0] h-4pxr w-full rounded-[14px] border-b-4 border-var-green-dark" />
              )}
            </button>
            <button className="relative" onClick={() => setStatus('declined')}>
              <h2 className="pb-15pxr">거절 {statusCount.declined}</h2>
              {status === 'declined' && (
                <hr className="absolute bottom-[0] left-[0] h-4pxr w-full rounded-[14px] border-b-4 border-var-green-dark" />
              )}
            </button>
          </div>

          <div className="mt-25pxr flex flex-col justify-center">
            <p className="text-20pxr font-[600]">예약 날짜</p>
            <p className="mb-10pxr mt-14pxr text-20pxr font-[400]">{newDateStr}</p>
            <Select
              options={scheduleTimeList}
              value={selectedScheduleTime}
              onChange={setSelectedScheduleTime}
            />
          </div>

          <div className="mt-32pxr flex flex-col justify-center">
            <p className="mb-16pxr text-20pxr font-[600]">예약 내역</p>
            {myReservationByTime?.data && (
              <ReservationCardList reservationList={myReservationByTime?.data} status={status} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

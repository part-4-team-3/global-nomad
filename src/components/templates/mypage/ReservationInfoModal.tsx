import Select from '@/components/molecules/select/Select';
import ReservationCardList from '@/components/organisms/card-list/ReservationCardList';
import { useHandleSelectedSchedule } from '@/models/mypage/use-handle-selected-schedule';
import { useHandleStatusCount } from '@/models/mypage/use-handle-status-count';
import { useScheduleTimeMapping } from '@/models/mypage/use-schedule-time-mapping';
import { useGetReservationByDate } from '@/queries/myActivities/get-reservation-date';
import { useGetScheduleByDate } from '@/queries/myActivities/get-schedule-date';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  activityId: number;
  date: string;
}

export default function ReservationInfoModal({ activityId, date }: Props) {
  const { setIsClose, key } = useModal();
  const isSelected = key === 'reservation-info';

  const [status, setStatus] = useState<'pending' | 'confirmed' | 'declined'>('pending');

  const { data: myScheduleByDate, refetch: scheduleByDateRefetch } = useGetScheduleByDate(
    activityId,
    date,
  );
  const { scheduleTimeList } = useScheduleTimeMapping(myScheduleByDate?.data);
  const [selectedScheduleTime, setSelectedScheduleTime] = useState('');
  const { selectedSchedule } = useHandleSelectedSchedule(
    myScheduleByDate?.data ?? null,
    selectedScheduleTime,
  );

  useEffect(() => {
    setSelectedScheduleTime('');
  }, [date]);

  const { data: myReservationByTime, refetch } = useGetReservationByDate(
    activityId,
    null,
    10,
    selectedSchedule?.scheduleId ?? null,
    status,
  );

  const totalStatus = useMemo(
    () =>
      myScheduleByDate?.data
        .flatMap((schedule) => schedule.count)
        .reduce(
          (acc, cur) => {
            acc.declined += cur.declined;
            acc.confirmed += cur.confirmed;
            acc.pending += cur.pending;
            return acc;
          },
          { declined: 0, confirmed: 0, pending: 0 },
        ),
    [myScheduleByDate],
  );

  const { statusCount } = useHandleStatusCount(selectedSchedule ?? null, totalStatus || null);

  const newDate = new Date(date);
  const newDateStr = `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;

  return (
    <>
      {isSelected && (
        <div className="mt-[-73px] flex h-full w-full flex-col border-t border-var-gray6 bg-white p-24pxr md:h-full md:rounded-[14px] md:border">
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
            <div className="w-full lg:h-270pxr lg:overflow-y-scroll">
              {myReservationByTime?.data && (
                <ReservationCardList
                  reservationList={myReservationByTime?.data}
                  status={status}
                  refetch={refetch}
                  scheduleByDateRefetch={scheduleByDateRefetch}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

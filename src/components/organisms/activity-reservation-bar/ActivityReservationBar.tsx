'use client';

import { useState } from 'react';
import Button from '@/components/atoms/button/Button';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { ActivityReservationSelector } from '@/components/molecules/activity-reservation-selector/ActivityReservationSelector';

interface Props {
  price: number;
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
}

export default function ActivityReservationBar({ price, scheduleHash, scheduledDates }: Props) {
  const [isScheduleSelectorOpen, setIsScheduleSelectorOpon] = useState<boolean>(false);
  const [isNumberSelectorOpen, setIsNumberSelectorOpon] = useState<boolean>(false);

  return (
    <div className="fixed bottom-[0px] left-[0px] right-[0px] flex w-full justify-between border-t border-[#a1a1a1] p-[16px]">
      <div className="flex flex-col gap-8pxr">
        <div className="flex gap-6pxr text-20pxr font-[700] leading-[26px]">
          <span>₩{price}</span>
          <span>/</span>
          <button className="text-18pxr text-var-green-dark underline">1명</button>
        </div>
        <button
          className="w-fit text-14pxr font-[600] text-var-green-dark underline"
          onClick={() => setIsScheduleSelectorOpon(true)}
        >
          날짜 선택하기
        </button>
      </div>

      <Button
        text="예약하기"
        color="black"
        className="px-24pxr py-14pxr disabled:bg-var-gray3"
        disabled={true}
      ></Button>

      {isScheduleSelectorOpen && (
        <ActivityReservationSelector
          scheduleHash={scheduleHash}
          scheduledDates={scheduledDates}
          onClose={() => setIsScheduleSelectorOpon(false)}
        />
      )}
    </div>
  );
}

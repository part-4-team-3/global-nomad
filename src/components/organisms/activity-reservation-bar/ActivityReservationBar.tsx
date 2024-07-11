'use client';

import { useState } from 'react';
import Button from '@/components/atoms/button/Button';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { ActivityReservationSelector } from '@/components/molecules/activity-reservation-selector/ActivityReservationSelector';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';

interface Props {
  price: number;
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
}

export default function ActivityReservationBar({ price, scheduleHash, scheduledDates }: Props) {
  const [isScheduleSelectorOpen, setIsScheduleSelectorOpon] = useState<boolean>(false);
  const [isNumberSelectorOpen, setIsNumberSelectorOpon] = useState<boolean>(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();

  const dateButtonText = selectedSchedule
    ? `${format(selectedSchedule.date, 'yy/MM/dd')} ${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`
    : '날짜 선택하기';

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
          {dateButtonText}
        </button>
      </div>

      <Button
        text="예약하기"
        color="black"
        className="px-24pxr py-14pxr disabled:bg-var-gray3"
        disabled={!selectedSchedule}
      ></Button>

      {isScheduleSelectorOpen && (
        <ActivityReservationSelector
          scheduleHash={scheduleHash}
          scheduledDates={scheduledDates}
          onClose={() => setIsScheduleSelectorOpon(false)}
          onSelect={(schedule: Schedule | undefined) => setSelectedSchedule(schedule)}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import Button from '@/components/atoms/button/Button';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { ActivityReservationSelector } from '@/components/molecules/activity-reservation-selector/ActivityReservationSelector';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ActivityParticipantSelector } from '@/components/molecules/activity-participant-selector/ActivityParticipantSelector';
import { useReservation } from '@/models/activity-reservation/use-reservation';
import PriceDisplay from '@/components/atoms/price-display/PriceDisplay';

interface Props {
  price: number;
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
}

export default function ActivityReservationBar({ price, scheduleHash, scheduledDates }: Props) {
  const [isScheduleSelectorOpen, setIsScheduleSelectorOpen] = useState<boolean>(false);
  const [isParticipantSelectorOpen, setIsParticipantSelectorOpen] = useState<boolean>(false);
  const { selectedSchedule, setSelectedSchedule, participants, setParticipants } = useReservation();

  const dateButtonText = selectedSchedule
    ? `${format(selectedSchedule.date, 'yy/MM/dd')} ${selectedSchedule.startTime} ~ ${selectedSchedule.endTime}`
    : '날짜 선택하기';

  return (
    <div className="fixed bottom-[0px] left-[0px] right-[0px] z-10 flex w-screen justify-between border-t border-[#a1a1a1] bg-white p-[16px]">
      <div className="flex flex-col gap-8pxr">
        <div className="flex gap-6pxr font-[500]">
          <PriceDisplay price={price * participants} />
          <span className="text-20pxr font-[600]">/</span>
          <button
            className="text-18pxr text-var-green-dark underline"
            onClick={() => setIsParticipantSelectorOpen(true)}
          >
            {participants}명
          </button>
        </div>
        <button
          className="w-fit text-14pxr font-[600] text-var-green-dark underline"
          onClick={() => setIsScheduleSelectorOpen(true)}
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
          onClose={() => setIsScheduleSelectorOpen(false)}
          onSelect={(schedule: Schedule | undefined) => setSelectedSchedule(schedule)}
        />
      )}

      {isParticipantSelectorOpen && (
        <ActivityParticipantSelector
          initialValue={participants}
          onClose={() => setIsParticipantSelectorOpen(false)}
          onSelect={(value) => setParticipants(value)}
        />
      )}
    </div>
  );
}

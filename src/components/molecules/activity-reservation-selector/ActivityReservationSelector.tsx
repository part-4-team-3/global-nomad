'use client';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Schedule } from '@/types/schedule';
import Image from 'next/image';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import ScheduleButton from '@/components/atoms/schedule-button/ScheduleButton';
import { useState } from 'react';
import Button from '@/components/atoms/button/Button';

interface Props {
  schedules?: Schedule[];
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
  onClose: () => void;
  onSelect: (schedule: Schedule | undefined) => void;
}

export function ActivityReservationSelector({
  scheduledDates,
  scheduleHash,
  onClose,
  onSelect,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const message = date ? '해당 날짜에 가능한 스케줄이 없습니다' : '날짜를 선택해주세요';

  const handleAccept = () => {
    onSelect(selectedSchedule);
    onClose();
  };

  return (
    <div className="fixed left-[0px] right-[0px] top-[0px] z-10 flex h-screen w-screen flex-col justify-between bg-white px-24pxr py-32pxr">
      <div className="flex w-full flex-col gap-24pxr">
        <div className="flex w-full items-center justify-between">
          {' '}
          <h2 className="text-28pxr font-[700]">날짜</h2>
          <button className="rounded-full hover:bg-var-gray6" onClick={onClose}>
            <Image src="/x-icon.svg" width={40} height={40} alt="close" />
          </button>
        </div>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            scheduled={scheduledDates}
            selected={date}
            onSelect={setDate}
            className="w-fit rounded-md border shadow"
          />
        </div>

        <p className="text-18pxr font-[700]">예약 가능한 시간</p>
        {formattedDate != '' && scheduleHash[formattedDate] ? (
          <div className="flex gap-12pxr">
            {scheduleHash[formattedDate].map((schedule) => (
              <ScheduleButton
                key={schedule.id}
                onClick={() => setSelectedSchedule({ ...schedule, date: formattedDate })}
              >
                {schedule.startTime}~{schedule.endTime}
              </ScheduleButton>
            ))}
          </div>
        ) : (
          <p className="w-full text-center">{message}</p>
        )}
      </div>
      <Button
        text="확인"
        color="black"
        onClick={handleAccept}
        disabled={!selectedSchedule}
        className="py-15pxr"
      />
    </div>
  );
}

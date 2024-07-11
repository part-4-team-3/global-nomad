'use client';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Schedule } from '@/types/schedule';
import { parseISO } from 'date-fns';
import {
  createScheduleHashMap,
  ScheduleHashMap,
} from '@/models/activity-reservation/create-schedule-hash-map';
import ScheduleButton from '@/components/atoms/schedule-button/ScheduleButton';
import { useState } from 'react';

interface Props {
  schedules?: Schedule[];
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
}

export function ActivityReservationSelector({
  schedules = [],
  scheduledDates,
  scheduleHash,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | undefined>();

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  const message = date ? '해당 날짜에 가능한 스케줄이 없습니다' : '날짜를 선택해주세요';

  return (
    <div className="flex w-fit flex-col gap-24pxr px-24pxr py-32pxr">
      <h2 className="text-28pxr font-[700]">날짜</h2>
      <Calendar
        mode="single"
        scheduled={scheduledDates}
        selected={date}
        onSelect={setDate}
        className="w-fit rounded-md border shadow"
      />

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
  );
}

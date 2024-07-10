'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

type schedule = {
  id: number;
  date: string;
  startTime: '12:00';
  endTime: '13:00';
};

interface Props {
  scheduled?: Date[];
}

export function ActivityCalendar({ scheduled }: Props) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  return (
    <div>
      <h2>날짜</h2>
      <Calendar
        mode="single"
        scheduled={scheduled}
        selected={date}
        onSelect={setDate}
        className="w-fit rounded-md border shadow"
      />
      {date && <p>{formattedDate}</p>}

      <p className="text-18pxr font-[700]">예약 가능한 시간</p>
    </div>
  );
}

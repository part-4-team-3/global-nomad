'use client';

import { useState } from 'react';
import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';
import { useQuery } from '@tanstack/react-query';
import { myActivities } from '@/queries/my-activities/my-activities';

export default function ReservationCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const myActivitiesOfMonth = useQuery(
    myActivities.queryOptions({ activityId: 1, year: '2024', month: '07' }, !!1),
  );

  return (
    <UIReservationCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="h-full w-full rounded-md border"
    />
  );
}

'use client';

import { useState } from 'react';
import { ReservationCalendar as UIReservationCalendar } from '@/components/ui/reservationCalendar';

export default function ReservationCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <UIReservationCalendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="h-full w-full rounded-md border"
    />
  );
}

'use client';

import ActivityReservationBar from '@/components/organisms/activity-reservation-bar/ActivityReservationBar';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { ReservationProvider } from '@/models/activity-reservation/use-reservation';

interface Props {
  price: number;
  scheduledDates: Date[];
  scheduleHash: ScheduleHashMap;
}

export default function ActivityReservationContainer({
  price,
  scheduledDates,
  scheduleHash,
}: Props) {
  return (
    <ReservationProvider>
      <ActivityReservationBar
        price={price}
        scheduleHash={scheduleHash}
        scheduledDates={scheduledDates}
      />
    </ReservationProvider>
  );
}

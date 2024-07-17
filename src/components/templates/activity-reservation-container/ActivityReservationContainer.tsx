'use client';

import ActivityReservationBar from '@/components/organisms/activity-reservation-bar/ActivityReservationBar';
import { ScheduleHashMap } from '@/models/activity-reservation/create-schedule-hash-map';
import { ReservationProvider } from '@/models/activity-reservation/use-reservation';
import ActivityReservationForm from '@/components/organisms/activity-reservation-form/ActivityReservationForm';
import ActivityReservationFormPC from '@/components/organisms/activity-reservation-form/ActivityReservationFormPC';
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
      <ActivityReservationForm
        price={price}
        scheduleHash={scheduleHash}
        scheduledDates={scheduledDates}
      />
      <ActivityReservationFormPC
        price={price}
        scheduleHash={scheduleHash}
        scheduledDates={scheduledDates}
      />
    </ReservationProvider>
  );
}

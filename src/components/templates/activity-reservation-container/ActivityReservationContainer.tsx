'use client';

import ActivityReservationBar from '@/components/organisms/activity-reservation-bar/ActivityReservationBar';
import { ReservationProvider } from '@/models/activity-reservation/use-reservation';
import ActivityReservationForm from '@/components/organisms/activity-reservation-form/ActivityReservationForm';
import ActivityReservationFormPC from '@/components/organisms/activity-reservation-form/ActivityReservationFormPC';
import { ReservationFormProps } from '@/types/reservation-form-props';
import useUser from '@/store/useUser';

interface Props extends ReservationFormProps {
  creatorId: number;
}

export default function ActivityReservationContainer({
  price,
  scheduledDates,
  scheduleHash,
  activityId,
  creatorId,
}: Props) {
  const { user } = useUser();
  const isNotMyActivity = creatorId !== user?.id;

  return (
    <>
      {isNotMyActivity && (
        <ReservationProvider>
          <>
            <ActivityReservationBar
              price={price}
              scheduleHash={scheduleHash}
              scheduledDates={scheduledDates}
              activityId={activityId}
            />
            <ActivityReservationForm
              price={price}
              scheduleHash={scheduleHash}
              scheduledDates={scheduledDates}
              activityId={activityId}
            />
            <ActivityReservationFormPC
              price={price}
              scheduleHash={scheduleHash}
              scheduledDates={scheduledDates}
              activityId={activityId}
            />
          </>
        </ReservationProvider>
      )}
    </>
  );
}

'use client';

import ActivityReservationBar from '@/components/organisms/activity-reservation-bar/ActivityReservationBar';
import { ReservationProvider } from '@/models/activity-reservation/use-reservation';
import ActivityReservationForm from '@/components/organisms/activity-reservation-form/ActivityReservationForm';
import ActivityReservationFormPC from '@/components/organisms/activity-reservation-form/ActivityReservationFormPC';
import { ReservationFormProps } from '@/types/reservation-form-props';
import LogInCover from '@/components/molecules/log-in-cover/LogInCover';
interface Props extends ReservationFormProps {
  creatorId: number;
  isNotLoggedIn: boolean;
  userId: number;
}

export default function ActivityReservationContainer({
  price,
  scheduledDates,
  scheduleHash,
  activityId,
  creatorId,
  isNotLoggedIn,
  userId,
}: Props) {
  const isNotMyActivity = creatorId !== userId;

  return (
    <>
      {isNotMyActivity && (
        <ReservationProvider>
          <div className="relative h-fit">
            {isNotLoggedIn && <LogInCover />}
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
          </div>
        </ReservationProvider>
      )}
    </>
  );
}

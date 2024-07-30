import ReservationCard from '@/components/molecules/card/ReservationCard';
import { ReservationListByTime } from '@/types/reservation';

interface Props {
  reservationList: ReservationListByTime;
  status: 'pending' | 'confirmed' | 'declined';
  refetch: () => void;
  scheduleByDateRefetch: () => void;
}

export default function ReservationCardList({
  scheduleByDateRefetch,
  reservationList,
  status,
  refetch,
}: Props) {
  return (
    <div className="flex flex-col gap-14pxr">
      {reservationList.reservations.map((reservation) => {
        return (
          <ReservationCard
            key={reservation.id}
            nickname={reservation.nickname}
            headCount={reservation.headCount}
            activityId={reservation.activityId}
            reservationId={reservation.id}
            status={status}
            refetch={refetch}
            scheduleByDateRefetch={scheduleByDateRefetch}
          />
        );
      })}
    </div>
  );
}

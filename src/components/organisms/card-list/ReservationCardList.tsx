import ReservationCard from '@/components/molecules/card/ReservationCard';
import { ReservationListByTime } from '@/types/reservation';

interface Props {
  reservationList: ReservationListByTime;
  status: 'pending' | 'confirmed' | 'declined';
}

export default function ReservationCardList({ reservationList, status }: Props) {
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
          />
        );
      })}
    </div>
  );
}

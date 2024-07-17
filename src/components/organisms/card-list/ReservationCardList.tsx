import ReservationCard from '@/components/molecules/card/ReservationCard';
import { ReservationListByTime } from '@/types/reservation';

interface Props {
  reservationList: ReservationListByTime;
}

export default function ReservationCardList({ reservationList }: Props) {
  return (
    <div className="flex flex-col gap-14pxr">
      {reservationList.reservations.map((reservation) => {
        return (
          <ReservationCard
            key={reservation.id}
            nickname={reservation.nickname}
            headCount={reservation.headCount}
          />
        );
      })}
    </div>
  );
}

import ReservationImage from '@/components/atoms/reservation-image/ReservationImage';
import { RESERVATION_COLORS, RESERVATION_LABELS, Reservation } from '@/types/reservation';

interface Props extends Reservation {}

export default function ReservationCard({
  activity,
  status,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
}: Props) {
  return (
    <div className="shadow-custom flex overflow-hidden rounded-[24px]">
      <ReservationImage src={activity.bannerImageUrl} />
      <div className="flex flex-col justify-center px-[24px] py-[25.5px]">
        <div className={`${RESERVATION_COLORS[status]} mb-8pxr font-bold`}>
          {RESERVATION_LABELS[status]}
        </div>
        <div className="mb-12pxr text-20pxr font-bold">{activity.title}</div>
        <div className="mb-16pxr text-14pxr">
          {`${date} · ${startTime} - ${endTime} · ${headCount}명`}
        </div>
        <div className="text-24pxr">{`₩${totalPrice.toLocaleString('ko-KR')}`}</div>
      </div>
    </div>
  );
}

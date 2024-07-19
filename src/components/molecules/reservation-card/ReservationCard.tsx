import Button from '@/components/atoms/button/Button';
import { useModal } from '@/store/useModal';
import { RESERVATION_COLORS, RESERVATION_LABELS, Reservation } from '@/types/reservation';
import EditReviewModal from '../modal/EditReviewModal';
import CardImage from '@/components/atoms/card-image/CardImage';

interface Props extends Reservation {
  onCancel: () => void;
}

export default function ReservationCard({
  id,
  activity,
  status,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  onCancel,
}: Props) {
  const { setIsOpen } = useModal();

  return (
    <div className="flex overflow-hidden rounded-[24px] shadow-custom">
      <CardImage variant="card" src={activity.bannerImageUrl} />
      <div className="flex w-full flex-col justify-center px-[24px] py-[25.5px]">
        <div className={`${RESERVATION_COLORS[status]} mb-8pxr font-bold`}>
          {RESERVATION_LABELS[status]}
        </div>
        <div className="mb-12pxr text-20pxr font-bold">{activity.title}</div>
        <div className="mb-16pxr text-14pxr">
          {`${date} · ${startTime} - ${endTime} · ${headCount}명`}
        </div>
        <div className="flex w-full justify-between">
          <span className="text-24pxr">{`₩${totalPrice.toLocaleString('ko-KR')}`}</span>
          {status === 'pending' && (
            <Button
              text="예약 취소"
              color="white"
              className="h-32pxr w-80pxr md:h-40pxr md:w-112pxr lg:w-144pxr"
              onClick={onCancel}
            />
          )}
          {status === 'completed' && (
            <>
              <Button
                text="후기 작성"
                color="black"
                className="h-32pxr w-80pxr md:h-40pxr md:w-112pxr lg:w-144pxr"
                onClick={() => {
                  setIsOpen(`editReviewModal-${id}`);
                }}
              />
              <EditReviewModal
                id={id}
                src={activity.bannerImageUrl}
                title={activity.title}
                price={totalPrice}
                date={`${date} · ${startTime} - ${endTime} · ${headCount}명`}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="flex rounded-[24px] bg-white">
      <CardImage variant="card" src={activity.bannerImageUrl} />
      <div className="flex w-full flex-col justify-center py-9pxr pl-8pxr shadow-custom md:py-[12px] md:pl-[12px] md:pr-[18px] lg:px-[24px] lg:py-[25.5px]">
        <div className={`${RESERVATION_COLORS[status]} mb-8pxr text-14pxr font-bold md:text-16pxr`}>
          {RESERVATION_LABELS[status]}
        </div>
        <div className="mb-12pxr text-14pxr font-bold md:text-18pxr lg:text-20pxr">
          {activity.title}
        </div>
        <div className="mb-16pxr text-12pxr md:text-14pxr lg:text-18pxr">
          {`${date} · ${startTime} - ${endTime} · ${headCount}명`}
        </div>
        <div className="gap-x-0 flex w-full justify-between">
          <span className="text-16pxr md:text-20pxr lg:text-24pxr">{`₩${totalPrice.toLocaleString('ko-KR')}`}</span>
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

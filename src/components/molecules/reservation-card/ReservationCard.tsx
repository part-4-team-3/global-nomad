import Button from '@/components/atoms/button/Button';
import { useModal } from '@/store/useModal';
import { RESERVATION_COLORS, RESERVATION_LABELS, Reservation } from '@/types/reservation';
import EditReviewModal from '../modal/EditReviewModal';
import CardImage from '@/components/atoms/card-image/CardImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelReservationMutationOptions } from './../../../mutations/my-reservations/cancel';
import { toast } from 'react-toastify';
import { afterCancel } from '@/models/my-reservations/update-cache';

interface Props extends Reservation {}

export default function ReservationCard({
  id,
  activity,
  status,
  totalPrice,
  headCount,
  date,
  startTime,
  endTime,
  reviewSubmitted,
}: Props) {
  const { setIsOpen } = useModal();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...cancelReservationMutationOptions,
    onSuccess: (data) => {
      afterCancel(queryClient, data.id);
      toast('예약 취소되었습니다.');
    },
  });

  return (
    <div className="flex h-full min-h-128pxr rounded-[24px] bg-white md:min-h-156pxr lg:min-h-204pxr">
      <CardImage variant="card" src={activity.bannerImageUrl} />
      <div className="flex w-full flex-col justify-center gap-[5px] px-[8px] py-[9px] shadow-custom md:py-[12px] md:pl-[12px] md:pr-[18px] lg:px-[24px] lg:py-[25.5px]">
        <div
          className={`${RESERVATION_COLORS[status]} text-14pxr font-bold md:text-16pxr md:leading-26pxr lg:mb-8pxr`}
        >
          {RESERVATION_LABELS[status]}
        </div>
        <div className="text-14pxr font-bold md:text-18pxr md:leading-26pxr lg:mb-12pxr lg:text-20pxr">
          {activity.title}
        </div>
        <div className="text-12pxr md:min-h-26pxr md:text-14pxr md:leading-24pxr lg:mb-16pxr lg:text-18pxr">
          {`${date} · ${startTime} - ${endTime} · ${headCount}명`}
        </div>
        <div className="gap-x-0 flex h-32pxr w-full items-center justify-between md:h-40pxr">
          <span className="text-16pxr md:text-20pxr md:leading-24pxr lg:text-24pxr lg:leading-29pxr">{`₩${totalPrice.toLocaleString('ko-KR')}`}</span>
          {status === 'pending' && (
            <Button
              text="예약 취소"
              color="white"
              className="h-32pxr w-80pxr text-14pxr md:h-40pxr md:w-112pxr md:text-16pxr lg:w-144pxr"
              onClick={() => {
                mutation.mutate({ reservationId: id });
              }}
            />
          )}
          {status === 'completed' && (
            <>
              <Button
                text={reviewSubmitted ? '후기 작성 완료' : '후기 작성'}
                color="black"
                disabled={reviewSubmitted}
                className="w-90pxr p-[3px] text-14pxr md:h-40pxr md:w-112pxr md:p-[8px] md:text-16pxr lg:w-144pxr"
                onClick={() => {
                  setIsOpen(`editReviewModal-${id}`);
                }}
              />
              {!reviewSubmitted && (
                <EditReviewModal
                  id={id}
                  src={activity.bannerImageUrl}
                  title={activity.title}
                  price={totalPrice}
                  date={`${date} · ${startTime} - ${endTime} · ${headCount}명`}
                  queryClient={queryClient}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/tailwind-utils';
import { useUpdateReservationStatus } from '@/mutations/activity/update-reservation-status';
import { Reservation } from '@/types/reservation';

interface Props {
  nickname: string;
  headCount: number;
  activityId: number;
  reservationId: number;
  status: 'pending' | 'confirmed' | 'declined';
}

export default function ReservationCard({
  nickname,
  headCount,
  activityId,
  reservationId,
  status,
}: Props) {
  const { mutate } = useUpdateReservationStatus(activityId, reservationId);

  return (
    <div className="rounded-[4px] border border-var-gray6 p-16pxr">
      <p className="text-16pxr font-[600] text-var-gray2">
        닉네임 <span className="font[600] ml-10pxr text-16pxr text-var-black">{nickname}</span>
      </p>
      <p className="text-16pxr font-[600] text-var-gray2">
        인원 <span className="font[600] ml-10pxr text-16pxr text-var-black">{headCount}명</span>
      </p>
      <div className={cn('flex justify-end gap-6pxr', status !== 'pending' && 'hidden')}>
        <button
          className="rounded-[6px] bg-[#121] px-20pxr py-10pxr text-white"
          onClick={() => mutate('confirmed')}
        >
          승인하기
        </button>
        <button
          className="rounded-[6px] border border-[#121] bg-white px-20pxr py-10pxr text-[#121]"
          onClick={() => mutate('declined')}
        >
          거절하기
        </button>
      </div>
      <div className={cn('flex justify-end gap-6pxr', status !== 'confirmed' && 'hidden')}>
        <div className="rounded-[26.5px] border bg-var-orange px-15pxr py-10pxr text-14pxr font-[700] text-var-orange-dark">
          예약 승인
        </div>
      </div>
      <div className={cn('flex justify-end gap-6pxr', status !== 'declined' && 'hidden')}>
        <div className="bg-red-light rounded-[26.5px] border px-15pxr py-10pxr text-14pxr font-[700] text-var-red-dark">
          예약 거절
        </div>
      </div>
    </div>
  );
}

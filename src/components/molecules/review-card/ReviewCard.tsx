import Image from 'next/image';
import { Review } from '@/types/review';
import { format } from 'date-fns';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const formattedDate = review.updatedAt
    ? format(review.updatedAt, 'yy.MM.dd')
    : format(review.createdAt, 'yy.MM.dd');

  return (
    <div className="flex gap-[16px]">
      <div className="relative h-45pxr w-45pxr shrink-0 overflow-hidden rounded-full">
        <Image src={review.user.profileImageUrl} fill alt="" objectFit="cover" />
      </div>

      <div>
        <div className="flex items-center gap-[4px]">
          <span className="font-[700]">{review.user.nickname}</span>
          <span className="text-14pxr"> |</span>
          <span className="text-var-gray3">{formattedDate}</span>
        </div>
        <p>{review.content}</p>
      </div>
    </div>
  );
}

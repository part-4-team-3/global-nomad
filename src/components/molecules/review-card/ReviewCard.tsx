import Image from 'next/image';
import { Review } from '@/types/review';
import { format } from 'date-fns';
import ProfileImage from '@/components/atoms/profile/ProfileImage';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const formattedDate = review.updatedAt
    ? format(review.updatedAt, 'yy.MM.dd')
    : format(review.createdAt, 'yy.MM.dd');

  return (
    <div className="flex flex-grow gap-[16px] p-[24px]">
      <div className="relative h-45pxr w-45pxr shrink-0 overflow-hidden">
        <ProfileImage
          imageUrl={review.user.profileImageUrl}
          nickname={review.user.nickname}
          className="size-45pxr text-24pxr font-[600]"
        />
      </div>

      <div>
        <div className="flex items-center gap-[4px]">
          <span className="font-[700]" tabIndex={0}>
            {review.user.nickname}
          </span>
          <span className="text-14pxr"> |</span>
          <span className="text-var-gray3">
            <time dateTime={formattedDate} tabIndex={0}>
              {formattedDate}
            </time>
          </span>
        </div>
        <p tabIndex={0}>{review.content}</p>
      </div>
    </div>
  );
}

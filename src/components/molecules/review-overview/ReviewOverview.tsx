import Image from 'next/image';
import { getRatingDescription } from '@/models/activity-reservation/get-rating-description';

interface Props {
  ratings: number;
  reviewCount: number;
}

export default function ReviewOverview({ ratings, reviewCount }: Props) {
  const rateText = getRatingDescription(ratings);
  const formattedReviewCount = reviewCount.toLocaleString('en-US');
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <h3 className="text-20pxr font-[700]" tabIndex={0}>
        후기
      </h3>
      <div className="flex items-center gap-[16px]">
        <data className="text-50pxr font-[600]" value={ratings} tabIndex={0}>
          {ratings}
        </data>
        <div className="flex flex-col gap-[8px]">
          <span tabIndex={0}>{rateText}</span>
          <div className="flex gap-[6px]">
            <Image src="/star-icon.svg" width={16} height={16} alt="" />
            <data value={reviewCount} tabIndex={0}>
              {formattedReviewCount}개 후기
            </data>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="flex w-full flex-col gap-[24px] px-[24px]">
      <span className="text-20pxr font-[700]">후기</span>
      <div className="flex items-center gap-[16px]">
        <span className="text-50pxr font-[600]">{ratings}</span>
        <div className="flex flex-col gap-[8px]">
          <span>{rateText}</span>
          <div className="flex gap-[6px]">
            <Image src="/star-icon.svg" width={16} height={16} alt="" />
            <span>{formattedReviewCount}개 후기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

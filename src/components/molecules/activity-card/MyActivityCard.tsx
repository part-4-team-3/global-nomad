'use client';

import CardImage from '@/components/atoms/card-image/CardImage';
import { Activity } from '@/types/activity';
import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

interface Props extends Activity {}

export default function MyActivityCard({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
}: Props) {
  return (
    <div className="flex rounded-[24px] bg-white">
      <Link
        href={`/myactivity/${id}/edit`}
        className="block w-full max-w-128pxr md:max-w-156pxr lg:max-w-204pxr"
      >
        <CardImage variant="card" src={bannerImageUrl} />
      </Link>
      <div className="flex w-full flex-col justify-center gap-6pxr py-[12px] pl-[8px] pr-[14px] shadow-custom md:pl-[12px] md:pr-[18px] lg:px-[24px] lg:py-[21px]">
        <ReviewRating
          reviewCount={reviewCount}
          rating={rating}
          color="black"
          className="h-17pxr md:h-19pxr"
        />
        <div className="flex min-h-81pxr flex-col justify-between md:min-h-107pxr lg:min-h-137pxr">
          <div className="mb-12pxr text-14pxr font-bold leading-26pxr md:text-18pxr lg:text-20pxr">
            {title}
          </div>
          <div className="flex h-32pxr w-full items-center justify-between md:h-40pxr">
            <span className="text-16pxr leading-19pxr md:text-20pxr md:leading-24pxr lg:text-24pxr lg:leading-29pxr">{`₩${price.toLocaleString('ko-KR')}`}</span>
            <DeleteButton activityId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

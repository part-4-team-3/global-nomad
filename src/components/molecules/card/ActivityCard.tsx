'use client';

import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import { Activity } from '@/types/activity';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  activity: Activity;
  isBest?: boolean;
}

export default function ActivityCard({ activity, isBest }: Props) {
  const [isImageError, setIsImageError] = useState(false);
  const defaultImage = isBest ? '/card-default-bg-top.svg' : '/card-default-bg.svg';
  return (
    <Link
      href={`/activity/${activity.id}`}
      className={`flex flex-none snap-start ${isBest ? 'relative size-186pxr overflow-hidden rounded-[20px] md:size-384pxr' : 'flex-col gap-[16px]'} `}
    >
      <Image
        src={isImageError ? defaultImage : activity.bannerImageUrl}
        width={isBest ? 384 : 283}
        height={isBest ? 384 : 283}
        alt=""
        className={`bg-[#d9d9d9] object-cover ${isBest ? 'absolute size-full' : 'h-168pxr w-full rounded-[20px] md:h-221pxr lg:h-283pxr'}`}
        onError={() => setIsImageError(true)}
      />
      <div
        className={`w-full ${isBest ? 'relative flex flex-col justify-end gap-[6px] px-[20px] py-[24px] md:gap-[20px] md:py-[30px]' : ''}`}
        style={
          isBest
            ? {
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%)',
              }
            : {}
        }
      >
        <ReviewRating
          rating={activity.rating}
          reviewCount={activity.reviewCount}
          color={isBest ? 'white' : 'gray'}
        />
        <h3
          className={`w-full truncate break-keep text-18pxr leading-[120%] ${isBest ? 'w-full text-18pxr font-[700] text-white md:w-[80%] md:text-30pxr' : 'mt-[10px] font-[600] md:text-24pxr'} `}
        >
          {activity.title}
        </h3>
        <div className={`flex items-center gap-[5px] ${isBest ? '' : 'mt-[8px]'}`}>
          <b
            className={`font-[700] ${isBest ? 'text-16pxr text-white md:text-20pxr' : 'text-20pxr md:text-28pxr'}`}
          >
            ₩ {activity.price.toLocaleString('ko-KR')}
          </b>
          <span className={`text-var-gray9 ${isBest ? 'text-14pxr' : 'text-16pxr md:text-20pxr'}`}>
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}

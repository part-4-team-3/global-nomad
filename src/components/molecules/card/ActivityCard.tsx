import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import { Activity } from '@/types/activity';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  activity: Activity;
  isBest?: boolean;
}

export default function ActivityCard({ activity, isBest }: Props) {
  return (
    <Link
      href=""
      className={`flex ${isBest ? 'relative size-186pxr overflow-hidden rounded-[20px] md:size-384pxr' : 'w-168pxr flex-col gap-16pxr md:w-221pxr lg:w-283pxr'} `}
    >
      <Image
        src={activity.bannerImageUrl ? activity.bannerImageUrl : '/card_default_bg.svg'}
        width={isBest ? 384 : 283}
        height={isBest ? 384 : 283}
        alt=""
        className={`object-cover ${isBest ? 'absolute size-full' : 'h-168pxr w-full rounded-[20px] md:h-221pxr lg:h-283pxr'}`}
      />
      <div
        className={`w-full ${isBest ? 'relative flex flex-col justify-end gap-6pxr px-20pxr py-24pxr md:gap-20pxr md:py-30pxr' : 'file:'}`}
        style={
          isBest
            ? {
                background:
                  'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%)',
              }
            : {}
        }
      >
        <ReviewRating color={isBest ? 'white' : 'gray'} />
        <h3
          className={`break-keep text-18pxr leading-[120%] ${isBest ? 'w-full text-18pxr font-[700] text-white md:w-[80%] md:text-30pxr' : 'mt-10pxr font-[600] md:text-24pxr'} `}
        >
          {activity.title}
        </h3>
        <div className={`flex items-center gap-5pxr ${isBest ? '' : 'mt-8pxr'}`}>
          <b
            className={`font-[700] ${isBest ? 'text-16pxr text-white md:text-20pxr' : 'text-20pxr md:text-28pxr'}`}
          >
            ₩ {activity.price}
          </b>
          <span className={`text-var-gray9 ${isBest ? 'text-14pxr' : 'text-16pxr md:text-20pxr'}`}>
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}

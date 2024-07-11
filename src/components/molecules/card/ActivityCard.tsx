import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  isBest?: boolean;
}

export default function ActivityCard({ isBest }: Props) {
  return (
    <Link
      href=""
      className={`flex ${isBest ? 'relative size-186pxr overflow-hidden rounded-[20px] md:size-384pxr' : 'w-168pxr flex-col gap-16pxr md:w-221pxr lg:w-283pxr'} `}
    >
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png"
        width={isBest ? 384 : 283}
        height={isBest ? 384 : 283}
        alt=""
        className={`object-cover ${isBest ? 'absolute size-full' : 'h-168pxr w-full rounded-[20px] md:h-221pxr lg:h-283pxr'}`}
      />
      <div
        className={`${isBest ? 'relative flex flex-col justify-end gap-6pxr px-20pxr py-24pxr md:gap-20pxr md:py-30pxr' : 'file:'}`}
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
          함께 배우면 즐거운 스트릿 댄스
        </h3>
        <div className={`flex items-center gap-5pxr ${isBest ? '' : 'mt-8pxr'}`}>
          <b
            className={`font-[700] ${isBest ? 'text-16pxr text-white md:text-20pxr' : 'text-20pxr md:text-28pxr'}`}
          >
            ₩ 190000
          </b>
          <span className={`text-var-gray9 ${isBest ? 'text-14pxr' : 'text-16pxr md:text-20pxr'}`}>
            / 인
          </span>
        </div>
      </div>
    </Link>
  );
}

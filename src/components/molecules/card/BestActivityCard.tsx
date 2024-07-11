import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Image from 'next/image';
import Link from 'next/link';

export default function BestActivityCard() {
  return (
    <Link
      href=""
      className="relative flex size-186pxr overflow-hidden rounded-[20px] sm:size-384pxr"
    >
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png"
        width={384}
        height={384}
        alt=""
        className="absolute size-full object-cover"
      />
      <div
        className="relative flex flex-col justify-end gap-6pxr px-20pxr py-24pxr sm:gap-20pxr sm:py-30pxr"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%)',
        }}
      >
        <ReviewRating color="white" />
        <h3 className="w-full break-keep text-18pxr font-[700] leading-[120%] text-white sm:w-[80%] sm:text-30pxr">
          함께 배우면 즐거운 스트릿 댄스
        </h3>
        <div className="flex items-center gap-5pxr">
          <b className="text-16pxr font-[700] text-white sm:text-20pxr">₩ 190000</b>
          <span className="text-var-gray9 text-14pxr">/ 인</span>
        </div>
      </div>
    </Link>
  );
}

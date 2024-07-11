import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Image from 'next/image';
import Link from 'next/link';

export default function ActivityCard() {
  return (
    <Link href="" className="relative flex size-384pxr overflow-hidden rounded-[20px] bg-var-black">
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png"
        width={384}
        height={384}
        alt=""
        className="absolute size-full object-cover"
      />
      <div
        className="relative flex flex-col justify-end gap-20pxr px-20pxr py-30pxr"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 33.33%, rgba(0, 0, 0, 0.80) 91.67%)',
        }}
      >
        <ReviewRating color="white" />
        <h3 className="w-[80%] break-keep text-30pxr font-[700] leading-[120%] text-white">
          함께 배우면 즐거운 스트릿 댄스
        </h3>
        <div className="flex items-center gap-5pxr">
          <b className="text-20pxr font-[700] text-white">₩ 190000</b>
          <span className="text-var-gray9 text-14pxr">/ 인</span>
        </div>
      </div>
    </Link>
  );
}

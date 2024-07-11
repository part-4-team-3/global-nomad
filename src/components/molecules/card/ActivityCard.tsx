import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Image from 'next/image';
import Link from 'next/link';

export default function ActivityCard() {
  return (
    <Link href="" className="gap-16.xr flex w-283pxr flex-col">
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png"
        width={283}
        height={283}
        alt=""
        className="mb-16pxr h-283pxr w-full rounded-[20px] object-cover"
      />
      <div className="">
        <ReviewRating color="gray" />
        <h3 className="mt-10pxr break-keep text-18pxr font-[600] leading-[120%] sm:text-24pxr">
          함께 배우면 즐거운 스트릿 댄스
        </h3>
        <div className="mt-8pxr flex items-center gap-5pxr">
          <b className="text-28pxr font-[700]">₩ 190000</b>
          <span className="text-var-gray9 text-20pxr">/ 인</span>
        </div>
      </div>
    </Link>
  );
}

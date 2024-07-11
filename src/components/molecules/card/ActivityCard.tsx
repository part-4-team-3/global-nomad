import ReviewRating from '@/components/atoms/review-rating/ReviewRating';
import Image from 'next/image';
import Link from 'next/link';

export default function ActivityCard() {
  return (
    <Link href="" className="gap-16.xr flex w-168pxr flex-col md:w-221pxr lg:w-283pxr">
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_547_1720439740814.png"
        width={283}
        height={283}
        alt=""
        className="mb-16pxr h-168pxr w-full rounded-[20px] object-cover md:h-221pxr lg:h-283pxr"
      />
      <div className="">
        <ReviewRating color="gray" />
        <h3 className="mt-10pxr break-keep text-18pxr font-[600] leading-[120%] md:text-24pxr">
          함께 배우면 즐거운 스트릿 댄스
        </h3>
        <div className="mt-8pxr flex items-center gap-5pxr">
          <b className="text-20pxr font-[700] md:text-28pxr">₩ 190000</b>
          <span className="text-var-gray9 text-16pxr md:text-20pxr">/ 인</span>
        </div>
      </div>
    </Link>
  );
}

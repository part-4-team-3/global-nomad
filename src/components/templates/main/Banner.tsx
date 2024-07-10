import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import { Activity } from '@/types/activity';
import Image from 'next/image';

interface Props {
  activity: Activity;
}

export default function Banner({ activity }: Props) {
  return (
    <div className="relative h-240pxr w-full overflow-hidden md:h-550pxr">
      <Image src={activity.bannerImageUrl} fill className="object-cover" alt="메인 배너" />
      <div
        className="relative h-full"
        style={{ background: 'linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)' }}
      >
        <InnerLayout
          mobilePx="keep"
          className="flex h-full flex-col justify-center gap-5pxr font-[700] text-white lg:gap-15pxr"
        >
          <h2 className="max-w-[60vw] break-keep text-24pxr leading-[120%] md:max-w-[90%] md:text-54pxr lg:max-w-550pxr lg:text-68pxr">
            {activity.title}
          </h2>
          <p className="text-14pxr md:text-20pxr lg:text-24pxr">인기 경험 BEST 🔥</p>
        </InnerLayout>
      </div>
    </div>
  );
}

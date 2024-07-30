'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import { Activity } from '@/types/activity';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Props {
  activities: Activity[];
}

export default function Banner({ activities }: Props) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slideRef = useRef<HTMLDivElement>(null);

  const BG_NUM = activities.length;
  const beforeSlide = activities[BG_NUM - 1];
  const afterSlide = activities[0];

  let slideArr = [beforeSlide, ...activities, afterSlide];
  const SLIDE_NUM = slideArr.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === SLIDE_NUM - 1) {
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = 'none';
          setCurrentIndex(1);
        }
        setTimeout(() => {
          if (slideRef.current) {
            slideRef.current.style.transition = 'all 1000ms ease-in-out';
          }
        }, 100);
      }, 1000);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = 'none';
          setCurrentIndex(BG_NUM);
        }
        setTimeout(() => {
          if (slideRef.current) {
            slideRef.current.style.transition = 'all 1000ms ease-in-out';
          }
        }, 100);
      }, 1000);
    }
  }, [currentIndex, SLIDE_NUM, BG_NUM]);

  return (
    <div className="relative h-240pxr w-full overflow-hidden bg-black md:h-550pxr">
      <div
        ref={slideRef}
        className={`flex h-full transition-transform duration-1000 ease-in-out`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slideArr.map((activity, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <Image
              src={activity.bannerImageUrl}
              width={1920}
              height={600}
              className="absolute left-[0] top-[0] h-full w-full object-cover"
              alt="메인 배너"
            />
            <div
              className="relative h-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.40) 100%)',
              }}
            >
              <InnerLayout
                mobilePx="keep"
                className="flex h-full flex-col justify-center gap-5pxr pb-[40px] font-[700] text-white md:pb-[0] lg:gap-15pxr"
              >
                <h2 className="max-w-[90%] break-keep text-24pxr leading-[120%] md:text-54pxr lg:text-68pxr">
                  {activity.title}
                </h2>
                <p className="text-14pxr md:text-20pxr lg:text-24pxr">
                  인기 경험 BEST {activities.map((item, i) => item.id === activity.id && i + 1)} 🔥
                </p>
                <Link
                  href={`/activity/${activity.id}`}
                  className="group mt-[5px] flex w-100pxr items-center justify-between rounded-[40px] bg-white px-[12px] py-[5px] text-12pxr font-[500] text-var-primary duration-200 hover:shadow-[0_4px_14px_0_rgba(17,34,17,0.4)] md:mt-[20px] md:w-200pxr md:px-[20px] md:py-[10px] md:text-16pxr"
                >
                  바로가기{' '}
                  <Image
                    src="arrow-right.svg"
                    width={24}
                    height={24}
                    alt="화살표"
                    className="size-20pxr translate-x-[5px] duration-200 group-hover:translate-x-[8px] md:size-24pxr md:group-hover:translate-x-[10px]"
                  />
                </Link>
              </InnerLayout>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

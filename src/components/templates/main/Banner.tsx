'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import { Activity } from '@/types/activity';
import Image from 'next/image';
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
    }, 4000);

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
                className="flex h-full flex-col justify-center gap-5pxr font-[700] text-white lg:gap-15pxr"
              >
                <h2 className="max-w-[90%] break-keep text-24pxr leading-[120%] md:text-54pxr lg:text-68pxr">
                  {activity.title}
                </h2>
                <p className="text-14pxr md:text-20pxr lg:text-24pxr">
                  인기 경험 BEST {activities.map((item, i) => item.id === activity.id && i + 1)} 🔥
                </p>
              </InnerLayout>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import { Activity } from '@/types/activity';
import Image from 'next/image';

interface Props {
  activities: Activity[];
}

export default function Banner({ activities }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 14000);

    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <div className="relative h-240pxr w-full overflow-hidden bg-black md:h-550pxr">
      {activities.map((activity, index) => (
        <div
          key={index}
          className={`top-0 left-0 duration-5000 absolute h-full w-full transition-opacity ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={activity.bannerImageUrl} fill className="object-cover" alt="메인 배너" />
          <div
            className="relative h-full"
            style={{
              background: 'linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)',
            }}
          >
            <InnerLayout
              mobilePx="keep"
              className="flex h-full flex-col justify-center gap-5pxr font-[700] text-white lg:gap-15pxr"
            >
              <h2 className="max-w-[90%] break-keep text-24pxr leading-[120%] md:text-54pxr lg:text-68pxr">
                {activity.title}
              </h2>
              <p className="text-14pxr md:text-20pxr lg:text-24pxr">인기 경험 BEST 🔥</p>
            </InnerLayout>
          </div>
        </div>
      ))}
    </div>
  );
}

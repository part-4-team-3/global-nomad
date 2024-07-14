'use client';

import BestActivityCardList from '@/components/organisms/card-list/BestActivityCardList';
import { ActivityResponse } from '@/types/activity';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  activitiesData: ActivityResponse;
}

export default function BestActivities({ activitiesData }: Props) {
  const [scrollAmount, setScrollAmount] = useState(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const arrowList = [
    {
      name: 'prev',
      style: 'scale-x-[-1]',
      onClick: () => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      },
    },
    {
      name: 'next',
      style: '',
      onClick: () => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      },
    },
  ];

  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth + 24;
      const maxScroll = 1224;
      const calculatedScroll = Math.min(containerWidth, maxScroll);
      setScrollAmount(calculatedScroll);
    }
  }, []);

  return (
    <div className="mt-40pxr flex flex-col gap-33pxr">
      <div className="flex items-center justify-between">
        <h3 className="text-36pxr font-[700]">🔥 인기 체험</h3>
        <div className="hidden gap-12pxr lg:flex">
          {arrowList.map((arrow) => (
            <button key={arrow.name} onClick={arrow.onClick}>
              <Image
                src="/arrow-right.svg"
                width={44}
                height={44}
                alt={arrow.name}
                className={arrow.style}
              />
            </button>
          ))}
        </div>
      </div>
      <BestActivityCardList activitiesData={activitiesData} carouselRef={carouselRef} />
    </div>
  );
}

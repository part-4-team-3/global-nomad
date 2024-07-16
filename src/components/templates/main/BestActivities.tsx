'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import BestActivityCardList from '@/components/organisms/card-list/BestActivityCardList';
import { ActivityResponse } from '@/types/activity';
import { throttle } from 'lodash';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  activitiesData: ActivityResponse;
}

export default function BestActivities({ activitiesData }: Props) {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const arrowList = [
    {
      name: 'prev',
      style: 'scale-x-[-1]',
      onClick: () => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      },
      disabled: isPrevDisabled,
    },
    {
      name: 'next',
      style: '',
      onClick: () => {
        if (carouselRef.current) {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      },
      disabled: isNextDisabled,
    },
  ];

  const updateScrollState = throttle(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setIsPrevDisabled(scrollLeft === 0);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth);
    }
  }, 200);

  useEffect(() => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const maxScroll = 1224;
      const calculatedScroll = Math.min(containerWidth, maxScroll) / 3;
      setScrollAmount(calculatedScroll);
      updateScrollState();
    }
  }, [updateScrollState]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollState);
      return () => {
        carousel.removeEventListener('scroll', updateScrollState);
      };
    }
  }, [updateScrollState]);

  return (
    <div className="mt-[24px] flex flex-col gap-[16px] md:gap-[33px] lg:mt-[40px]">
      <InnerLayout className="flex items-center justify-between">
        <h3 className="text-18pxr font-[700] md:text-36pxr">🔥 인기 체험</h3>
        <div className="hidden gap-[12px] lg:flex">
          {arrowList.map((arrow) => (
            <button
              key={arrow.name}
              onClick={arrow.onClick}
              disabled={arrow.disabled}
              className="disabled:opacity-[50%]"
            >
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
      </InnerLayout>
      <div className="mx-auto w-full max-w-1200pxr">
        <BestActivityCardList activitiesData={activitiesData} carouselRef={carouselRef} />
      </div>
    </div>
  );
}

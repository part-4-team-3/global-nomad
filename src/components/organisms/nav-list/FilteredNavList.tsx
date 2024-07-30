'use client';

import Button from '@/components/atoms/button/Button';
import makeQueryString from '@/lib/query-string';
import { ActivityCategory } from '@/types/activity';
import { useEffect, useRef, useState } from 'react';

const categoryList = ['모든 체험', '문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface Props {
  currentCategory: ActivityCategory | '모든 체험';
  searchParamsSort: {};
}

export default function FilteredNavList({
  currentCategory = '모든 체험',
  searchParamsSort,
}: Props) {
  const [hideLeftGradient, setHideLeftGradient] = useState(true);
  const [hideRightGradient, setHideRightGradient] = useState(true);
  const navRef = useRef<HTMLUListElement>(null);

  const checkScroll = () => {
    if (navRef.current) {
      const isScrollable = navRef.current.scrollWidth > navRef.current.clientWidth;
      const isEndReached =
        navRef.current.scrollWidth - navRef.current.scrollLeft <= navRef.current.clientWidth;
      setHideRightGradient(isEndReached || !isScrollable);

      const isStartReached = navRef.current.scrollLeft === 0;
      setHideLeftGradient(isStartReached || !isScrollable);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleScroll = () => {
      checkScroll();
    };
    const handleResize = () => {
      checkScroll();
    };

    const navElement = navRef.current;
    if (navElement) {
      navRef.current.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      if (navElement) {
        navElement.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full grow md2:w-[calc(100%-300px)]">
      {!hideLeftGradient && (
        <div className="absolute left-[0] top-[0] h-full w-70pxr bg-gradient-to-l from-transparent to-white" />
      )}
      <ul
        ref={navRef}
        className="flex w-full gap-[8px] overflow-x-auto scrollbar-hide md:gap-[16px] lg:gap-[24px]"
      >
        {categoryList.map((category) => (
          <li key={category}>
            <Button
              text={category}
              color="white"
              className={`w-80pxr !rounded-[15px] !border-var-green-dark py-[8px] !font-[500] md:w-120pxr md:py-[14px] lg:w-127pxr ${currentCategory === category ? '!bg-var-green-dark !text-white' : '!text-var-green-dark'}`}
              link={
                category === '모든 체험'
                  ? makeQueryString({ category: '모든 체험', sort: searchParamsSort })
                  : makeQueryString({ category, sort: searchParamsSort })
              }
            />
          </li>
        ))}
      </ul>
      {!hideRightGradient && (
        <div className="absolute right-[0] top-[0] h-full w-70pxr bg-gradient-to-r from-transparent to-white" />
      )}
    </div>
  );
}

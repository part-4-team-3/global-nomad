import { useEffect, useRef, useState } from 'react';
import { Activity } from '@/types/activity';

export const useBanner = (activities: Activity[]) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const slideRef = useRef<HTMLDivElement>(null);

  const BG_NUM = activities.length;
  const beforeSlide = activities[BG_NUM - 1];
  const afterSlide = activities[0];

  const slideArr = [beforeSlide, ...activities, afterSlide];
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

  return { currentIndex, slideRef, slideArr, setCurrentIndex };
};

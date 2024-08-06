'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 버튼 클릭 핸들러
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-[16px] right-[16px] z-[99] flex size-40pxr items-center justify-center rounded-full border border-var-gray3 bg-white pb-[2px] transition-all duration-100 hover:shadow-hover md:bottom-[30px] md:right-[24px]"
    >
      <Image
        src="/arrow-right.svg"
        width={30}
        height={30}
        alt="스크롤 위로"
        className="-rotate-90"
      />
    </button>
  );
}

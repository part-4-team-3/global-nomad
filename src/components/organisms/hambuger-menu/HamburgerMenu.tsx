'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import useUser from '@/store/useUser';
import HamburgerMenuItem from './HamburgerMenuItem';
import MyPageProfile from '@/components/molecules/my-page-profile/MyPageProfile';

const HAMBURGER_LINE_LIST = [
  {
    closeStyle: 'rotate-[-45deg] translate-y-[4px] w-19pxr',
  },
  {
    closeStyle: 'rotate-[45deg] translate-y-[-4px] w-19pxr',
  },
];

export default function HamburgerMenu() {
  const { user } = useUser();
  const [isActive, setIsActive] = useState(false);

  /** 햄버거메뉴 활성화시 스크롤 불가 */
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isActive]);

  return (
    <div className="z-[59] flex flex-col">
      <button
        className="text-3xl relative flex h-10pxr w-16pxr flex-col justify-between"
        onClick={() => setIsActive((prev) => !prev)}
      >
        {HAMBURGER_LINE_LIST.map((line, index) => (
          <div
            key={index}
            className={`h-2pxr w-full rounded-[2px] bg-var-green-dark duration-200 ease-in-out ${isActive ? line.closeStyle : ''}`}
          />
        ))}
      </button>
      <div
        className={`absolute left-[0px] top-[43px] flex h-[calc(100vh-43px)] w-[100vw] list-none flex-col bg-white md:top-[66px] md:h-[calc(100vh-66px)] ${isActive ? 'block' : 'hidden'}`}
      >
        {user ? (
          <div className="flex items-center gap-[20px] bg-var-gray6 px-[24px] py-[20px]">
            <MyPageProfile />
            <h3 className="text-20pxr font-[600] text-var-gray1">{user.nickname}</h3>
          </div>
        ) : (
          <div className="flex gap-[20px] border-b py-[12px] font-bold text-[16pxr] text-var-gray3">
            로그인이 필요합니다.
            <Link className="text-var-green-dark2" href="/signin">
              로그인
            </Link>
          </div>
        )}
        {isActive && <HamburgerMenuItem isActive={isActive} setIsActive={setIsActive} />}
      </div>
    </div>
  );
}

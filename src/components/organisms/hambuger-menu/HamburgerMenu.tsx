'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Profile from '@/components/atoms/profile/Profile';
import useUser from '@/store/useUser';
import HamburgerMenuItem from './HamburgerMenuItem';

export default function HamburgerMenu() {
  const { user } = useUser();
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <div ref={menuRef} className="flex flex-col">
      <div className="space-x-2 flex items-center">
        <button className="text-3xl" onClick={() => setIsActive((prev) => !prev)}>
          <div className="relative size-32pxr">
            <Image fill src="/hamburger-menu-button.svg" alt="마이페이지 메뉴" />
          </div>
        </button>
      </div>
      <ul
        className={`absolute right-[0px] top-[72px] z-10 flex h-[calc(100vh-67px)] w-228pxr list-none flex-col bg-white p-[8px] ${isActive ? 'block' : 'hidden'}`}
      >
        {user ? (
          <li className="flex items-center gap-12pxr border-b py-[12px]">
            <Profile nickname={user.nickname} imageUrl={user.profileImageUrl} />
          </li>
        ) : (
          <li className="flex gap-[20px] border-b py-[12px] font-bold text-[16pxr] text-var-gray3">
            로그인이 필요합니다.
            <Link className="text-var-green-dark2" href="/signin">
              로그인
            </Link>
          </li>
        )}
        {isActive && <HamburgerMenuItem isActive={isActive} setIsActive={setIsActive} />}
      </ul>
    </div>
  );
}

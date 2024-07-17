'use client';
import { menuItems } from '@/constant/my-page-menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '@/components/atoms/profile/Profile';
import useUser from '@/store/useUser';

export default function HamburgerMenu() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const menuStyle =
    'flex w-full gap-[14px] py-[24px] px-[16px] text-[16pxr] font-bold text-var-gray3';
  const activeMenuStyle = 'text-var-green-dark  bg-var-green2 rounded-[12px]';

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
    <div className="flex flex-col">
      <div className="space-x-2 flex items-center">
        <button className="text-3xl" onClick={() => setIsActive((prev) => !prev)}>
          <div>test</div>
        </button>
      </div>
      <ul
        className={`absolute right-[0px] top-[67px] z-10 flex h-[calc(100vh-67px)] w-228pxr list-none flex-col border-r-2 border-gray-200 bg-white p-[8px] ${isActive ? 'block' : 'hidden'}`}
      >
        {user ? (
          <li className="flex items-center gap-12pxr border-b py-[12px]">
            <Profile nickname={user.nickname} imageUrl={user.profileImageUrl} />
          </li>
        ) : (
          <li className="border-b py-[12px] font-bold text-[16pxr] text-var-gray3">
            로그인이 필요합니다.
          </li>
        )}
        {isActive &&
          menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${menuStyle} ${pathname === item.href ? activeMenuStyle : ''}`}
              >
                <div className="relative size-[24px]">
                  <Image
                    fill
                    src={pathname === item.href ? item.activeImg : item.defaultImg}
                    alt={item.alt}
                  />
                </div>
                {item.text}
              </Link>
            </li>
          ))}
        {user && (
          <div className="mt-auto flex justify-end p-[16px]">
            <button className="rounded-[12px] px-[16px] py-[8px] font-bold text-[16pxr] text-var-gray3">
              로그아웃
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}

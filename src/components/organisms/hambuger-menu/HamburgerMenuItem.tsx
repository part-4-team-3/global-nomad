'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/constant/my-page-menu';
import useUser from '@/store/useUser';
import { deleteCookie } from '@/app/(action)/(cookie)/cookie';
import { useRouter } from 'next/navigation';
import { RefObject, useEffect } from 'react';

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: RefObject<HTMLUListElement>;
}

export default function HamburgerMenuItem({ isActive, setIsActive, menuRef }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearUser } = useUser();
  const menuStyle =
    'flex w-full gap-[14px] py-[24px] px-[16px] text-[16pxr] font-bold text-var-gray3';
  const activeMenuStyle = 'text-var-green-dark  bg-var-green2 rounded-[12px]';

  /** 로그아웃 로직 */
  const handleLogout = () => {
    deleteCookie('userId');
    clearUser();
    router.push('/signin');
  };

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
    <ul
      ref={menuRef}
      className={`absolute right-[0px] top-[67px] z-10 flex h-[calc(100vh-67px)] w-228pxr list-none flex-col border-r-2 border-gray-200 bg-white p-[8px] ${isActive ? 'block' : 'hidden'}`}
    >
      {isActive &&
        menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${menuStyle} ${pathname.includes(item.href) ? activeMenuStyle : ''}`}
            >
              <div className="relative size-[24px]">
                <Image
                  fill
                  src={pathname.includes(item.href) ? item.activeImg : item.defaultImg}
                  alt={item.alt}
                />
              </div>
              {item.text}
            </Link>
          </li>
        ))}
      {user && (
        <div className="mt-auto flex justify-end p-[16px]">
          <button
            className="rounded-[12px] px-[16px] py-[8px] font-bold text-[16pxr] text-var-gray3"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </ul>
  );
}

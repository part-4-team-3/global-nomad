'use client';

import MyPageProfile from '@/components/molecules/my-page-profile/MyPageProfile';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SideNavigationMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const menuStyle =
    'flex w-full gap-[14px] py-[9px] px-[16px] text-[16pxr] font-bold text-var-gray3 hover:text-var-green-dark';

  const activeMenuStyle = 'text-var-green-dark bg-var-green2 rounded-[12px]';

  const menuItems = [
    {
      href: '/mypage',
      defaultImg: '/my-info-icon.svg',
      activeImg: '/my-info-icon-active.svg',
      alt: '내 정보',
      text: '내 정보',
    },
    {
      href: '/reservation',
      defaultImg: '/reservation-icon.svg',
      activeImg: '/reservation-icon-active.svg',
      alt: '예약 내역',
      text: '예약 내역',
    },
    {
      href: '/myactivity/post',
      defaultImg: '/my-activity-setting-icon.svg',
      activeImg: '/my-activity-setting-icon-active.svg',
      alt: '내 체험 관리',
      text: '내 체험 관리',
    },
    {
      href: '/calendar',
      defaultImg: '/reservation-status-icon.svg',
      activeImg: '/reservation-status-icon-active.svg',
      alt: '예약 현황',
      text: '예약 현황',
    },
  ];

  return (
    <div className="flex hidden h-432pxr w-1/4 flex-col gap-[24px] rounded-xl p-[24px] shadow-md md:block">
      <MyPageProfile />
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${menuStyle} ${pathname === item.href ? activeMenuStyle : ''}`}
                onMouseEnter={() => setHoveredItem(item.text)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative size-[24px]">
                  <Image
                    fill
                    src={
                      pathname === item.href || hoveredItem === item.text
                        ? item.activeImg
                        : item.defaultImg
                    }
                    alt={item.alt}
                  />
                </div>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

'use client';

import MyPageProfile from '@/components/molecules/my-page-profile/MyPageProfile';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { menuItems } from '@/constant/my-page-menu';

export default function SideNavigationMenu() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const menuStyle =
    'flex w-full gap-[14px] py-[9px] px-[16px] text-[16pxr] font-bold text-var-gray3 hover:text-var-green-dark';

  const activeMenuStyle = 'text-var-green-dark bg-var-green2 rounded-[12px]';

  return (
    <div className="hidden h-432pxr w-432pxr flex-col gap-[24px] rounded-xl bg-white p-[24px] shadow-md md:block">
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

'use client';
import { menuItems } from '@/constant/my-page-menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function HamburgerMenu() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(true);
  const onClick = () => setIsActive((prev) => !prev);
  const menuStyle =
    'flex w-full gap-[14px] py-[24px] px-[16px] text-[16pxr] font-bold text-var-gray3';
  const activeMenuStyle = 'text-var-green-dark  bg-var-green2 rounded-[12px]';
  return (
    <div className="flex flex-col">
      <div className="space-x-2 flex items-center">
        <button className="text-3xl" onClick={onClick}>
          <div>test</div>
        </button>
      </div>
      <button className="menu-trigger"></button>
      <aside
        className={`absolute right-[0px] top-[67px] z-10 flex h-screen w-228pxr list-none flex-col border-r-2 border-gray-200 bg-white p-[8px] ${isActive ? 'block' : 'hidden'}`}
      >
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
      </aside>
    </div>
  );
}

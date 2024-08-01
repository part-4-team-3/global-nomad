'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import HamburgerMenu from '@/components/organisms/hambuger-menu/HamburgerMenu';
import Image from 'next/image';
import Link from 'next/link';
import NotificationButton from '@/components/atoms/button/NotificationButton';
import useUser from '@/store/useUser';
import { NotificationProvider } from '@/models/header/notification-context';
import HeaderProfile from '@/components/molecules/profile/HeaderProfile';

const navList = [
  {
    text: '로그인',
    link: '/signin',
  },
  {
    text: '회원가입',
    link: '/signup',
  },
];

export default function Header() {
  const { user } = useUser();

  return (
    <header className="sticky left-[0] top-[0] z-[60] border-b border-var-gray6 bg-white">
      <InnerLayout
        mobilePx="keep"
        className="relative flex items-center justify-between py-[10px] md:py-[19px]"
      >
        <h1>
          <Link href="/">
            <Image
              src="/logo.svg"
              width={165}
              height={28}
              className="w-130pxr md:w-165pxr"
              alt="GlobalNomad logo"
            />
          </Link>
        </h1>
        <nav>
          {user ? (
            <div className="flex items-center gap-12pxr md:gap-25pxr">
              <NotificationProvider>
                <NotificationButton />
              </NotificationProvider>
              {/* 모바일사이즈에서 햄버거 메뉴 태블릿사이즈부터 프로필 */}
              <div className="hidden md:flex">
                <HeaderProfile nickname={user.nickname} imageUrl={user.profileImageUrl} />
              </div>
              <div className="block md:hidden">
                <HamburgerMenu />
              </div>
            </div>
          ) : (
            <ul className="flex gap-25pxr">
              {navList.map((nav) => (
                <Link href={nav.link} key={nav.text} className="text-14pxr font-[500]">
                  {nav.text}
                </Link>
              ))}
            </ul>
          )}
        </nav>
      </InnerLayout>
    </header>
  );
}

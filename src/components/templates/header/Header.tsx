'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Profile from '@/components/atoms/profile/Profile';
import HamburgerMenu from '@/components/organisms/hambuger-menu/HamburgerMenu';
import useUser from '@/store/useUser';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { user } = useUser();

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
  return (
    <header className="border-b border-var-gray6 bg-white">
      <InnerLayout mobilePx="keep" className="flex items-center justify-between py-19pxr">
        <h1>
          <Link href="/">
            <Image src="/logo.svg" width={165.5} height={28} alt="GlobalNomad logo" />
          </Link>
        </h1>
        <nav>
          {user ? (
            <ul className="flex items-center gap-12pxr md:gap-25pxr">
              <button>
                <Image src="/bell.svg" alt="알림" width={20} height={20} />
              </button>
              <div className="h-22pxr w-1pxr bg-var-gray6" />
              {/* 모바일사이즈에서 햄버거 메뉴 태블릿사이즈부터 프로필 */}
              <div className="hidden md:flex">
                <Profile nickname={user.nickname} imageUrl={user.profileImageUrl} />
              </div>
              <div className="block md:hidden">
                <HamburgerMenu />
              </div>
            </ul>
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

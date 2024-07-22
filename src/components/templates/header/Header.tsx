// 'use client';

import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Image from 'next/image';
import Link from 'next/link';
import AlertModal from './AlertModal';
import { getCookie } from '@/app/(action)/(cookie)/cookie';
import HeaderProfile from '@/components/molecules/profile/HeaderProfile';

export default async function Header() {
  const userId = await getCookie('userId');

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
    <header className="z-10 border-b border-var-gray6 bg-white">
      <InnerLayout mobilePx="keep" className="relative flex items-center justify-between py-[19px]">
        <h1>
          <Link href="/">
            <Image src="/logo.svg" width={165.5} height={28} alt="GlobalNomad logo" />
          </Link>
        </h1>
        <nav>
          {userId ? (
            <div className="flex items-center gap-12pxr md:gap-25pxr">
              <button>
                <Image src="/bell.svg" alt="알림" width={20} height={20} />
              </button>
              <div className="h-22pxr w-1pxr bg-var-gray6" />
              <HeaderProfile />
              <AlertModal />
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

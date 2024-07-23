import InnerLayout from '@/components/atoms/inner-layout/InnerLayout';
import Profile from '@/components/atoms/profile/Profile';
import HamburgerMenu from '@/components/organisms/hambuger-menu/HamburgerMenu';
import useUser from '@/store/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from '@/app/(action)/(cookie)/cookie';
import HeaderProfile from '@/components/molecules/profile/HeaderProfile';
import { getMyNotifications } from '@/queries/my-notifications/get-my-notifications';
import { useModal } from '@/store/useModal';
import NotificationModal from './NotificationModal';
import NotificationButton from '@/components/atoms/button/NotificationButton';

export default async function Header() {
  const userId = await getCookie('userId');
  const notificationData = await getMyNotifications();

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
              <NotificationButton notificationData={notificationData} />
              {/* 모바일사이즈에서 햄버거 메뉴 태블릿사이즈부터 프로필 */}
              <div className="hidden md:flex">
                <HeaderProfile />
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

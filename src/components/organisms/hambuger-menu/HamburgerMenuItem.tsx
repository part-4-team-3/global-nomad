'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/constant/my-page-menu';
import useUser from '@/store/useUser';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { deleteCookie, getCookie } from '@/app/(action)/(cookie)/cookie';
import { getInstance } from '@/lib/axios';
import { useQueryClient } from '@tanstack/react-query';
import { ReservationStatus } from '@/types/reservation';
import { reservationsKeys } from '@/queries/reservations/query-keys';

interface Props {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HamburgerMenuItem({ isActive, setIsActive }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [, , removeCookie] = useCookies(['userId', 'accessToken', 'refreshToken']);
  const { user, clearUser } = useUser();
  const menuStyle =
    'flex w-full gap-[14px] py-[24px] px-[16px] text-[16pxr] font-bold text-var-gray3';
  const activeMenuStyle = 'text-var-green-dark  bg-var-green2 rounded-[12px]';

  const queryClient = useQueryClient();

  /** 로그아웃 로직 */
  const handleLogout = async () => {
    const apiInstance = getInstance();
    const userId = await getCookie('userId');
    await apiInstance.delete(`auth/logout?userId=${userId}`);
    deleteCookie('userId');
    clearUser();
    queryClient.invalidateQueries({
      queryKey: ['my-activities'],
      exact: true,
    });
    const statuses: (ReservationStatus | null)[] = [
      null,
      'pending',
      'confirmed',
      'declined',
      'canceled',
      'completed',
    ];

    statuses.forEach((status) => {
      queryClient.invalidateQueries({
        queryKey: reservationsKeys.getMyReservations(status),
        exact: true,
      });
    });
    router.push('/signin');
  };

  return (
    <>
      <ul className="grow flex-col px-[24px] pt-[20px]">
        {isActive &&
          menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`${menuStyle} ${pathname.includes(item.href) ? activeMenuStyle : ''}`}
                onClick={() => {
                  setIsActive(false);
                }}
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
      </ul>
      {user && (
        <div className="flex justify-end p-[16px]">
          <button
            className="rounded-[12px] px-[16px] py-[8px] text-16pxr font-bold text-var-gray3"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </>
  );
}

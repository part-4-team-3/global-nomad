import MyPageProfile from '@/components/molecules/my-page-profile/MyPageProfile';
import Image from 'next/image';
import Link from 'next/link';

export default function SideNavigationMenu() {
  const menuStyle =
    'flex w-full gap-[14px] py-[9px] px-[16px] text-[16pxr] font-bold text-var-gray3';
  return (
    <div className="flex w-1/4 flex-col gap-[24px] rounded-xl p-[24px] shadow-md">
      <MyPageProfile />
      <nav className="mt-4">
        <ul>
          <li>
            <Link href="/mypage" className={menuStyle}>
              <div className="relative size-[24px]">
                <Image fill src="/my-info-icon.svg" alt="내 정보" />
              </div>
              내 정보
            </Link>
          </li>
          <li>
            <Link href="/reservation" className={menuStyle}>
              <div className="relative size-[24px]">
                <Image fill src="/reservation-icon.svg" alt="예약 내역" />
              </div>
              예약 내역
            </Link>
          </li>
          <li>
            <Link href="/myactivity" className={menuStyle}>
              <div className="relative size-[24px]">
                <Image fill src="/my-activity-setting-icon.svg" alt="내 체험 관리" />
              </div>
              내 체험 관리
            </Link>
          </li>
          <li>
            <Link href="/calendar" className={menuStyle}>
              <div className="relative size-[24px]">
                <Image fill src="/reservation-status-icon.svg" alt="예약 현황" />
              </div>
              예약 현황
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

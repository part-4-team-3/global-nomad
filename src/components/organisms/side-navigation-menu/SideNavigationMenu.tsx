import Image from 'next/image';
import Link from 'next/link';

export default function SideNavigationMenu() {
  const menuStyle = 'flex gap-[14px] py-[9px] px-[16px] text-[16px] font-bold text-var-gray3';
  return (
    <div className="p-4 w-1/4 rounded-xl shadow-md">
      <nav className="mt-4">
        <ul>
          <li className={menuStyle}>
            <div className="relative size-[24px]">
              <Image fill src="/my-info-icon.svg" alt="내 정보" />
            </div>
            <Link href="/mypage">내 정보</Link>
          </li>
          <li className={menuStyle}>
            <div className="relative size-[24px]">
              <Image fill src="/reservation-icon.svg" alt="예약 내역" />
            </div>
            <Link href="/reservation">예약 내역</Link>
          </li>
          <li className={menuStyle}>
            <div className="relative size-[24px]">
              <Image fill src="/my-activity-setting-icon.svg" alt="내 체험 관리" />
            </div>
            <Link href="/myactivity">내 체험 관리</Link>
          </li>
          <li className={menuStyle}>
            <div className="relative size-[24px]">
              <Image fill src="/reservation-status-icon.svg" alt="예약 현황" />
            </div>
            <Link href="/calendar">예약 현황</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

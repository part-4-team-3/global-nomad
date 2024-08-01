'use client';

import { deleteCookie } from '@/app/(action)/(cookie)/cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useUser from '@/store/useUser';
import Link from 'next/link';
import Profile from '@/components/atoms/profile/Profile';

interface Props {
  nickname: string;
  imageUrl: string | null;
}

export default function HeaderProfile({ nickname, imageUrl }: Props) {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { clearUser } = useUser();

  const listStyle =
    'w-full text-start text-14pxr block py-[13px] px-[16px]  hover:bg-var-green2 hover:text-var-green-dark hover:font-[500]';

  /** 로그아웃 로직 */
  const handleLogout = async () => {
    deleteCookie('userId');
    clearUser();
    router.push('/signin');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsActive((prev) => !prev)}>
        <Profile nickname={nickname} imageUrl={imageUrl} />
      </button>

      <ul
        ref={menuRef}
        className={`shadow-all absolute right-[22px] top-[65px] z-10 flex w-130pxr list-none flex-col overflow-hidden rounded-lg bg-white ${isActive ? 'block' : 'hidden'}`}
      >
        <li>
          <Link href="/mypage" className={`${listStyle}`}>
            내 정보
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className={`${listStyle}`}>
            로그아웃
          </button>
        </li>
      </ul>
    </>
  );
}

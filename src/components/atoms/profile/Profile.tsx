'use client';

import ProfileImage from './ProfileImage';
import HamburgerMenuItem from '@/components/organisms/hambuger-menu/HamburgerMenuItem';
import { useEffect, useRef, useState } from 'react';

interface Props {
  nickname: string;
  imageUrl: string | null;
}

export default function Profile({ nickname, imageUrl }: Props) {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
      <button
        ref={buttonRef}
        className="flex items-center gap-10pxr"
        onClick={() => setIsActive((prev) => !prev)}
      >
        <ProfileImage nickname={nickname} imageUrl={imageUrl} />
        <p className="text-14pxr font-[500]">{nickname}</p>
      </button>

      <ul
        ref={menuRef}
        className={`absolute right-[0px] top-[71px] z-10 flex w-228pxr list-none flex-col rounded-b-lg bg-white p-[8px] ${isActive ? 'block' : 'hidden'}`}
      >
        {isActive && <HamburgerMenuItem isActive={isActive} setIsActive={setIsActive} />}
      </ul>
    </>
  );
}

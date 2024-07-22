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

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
      <button className="flex items-center gap-10pxr" onClick={() => setIsActive((prev) => !prev)}>
        <ProfileImage nickname={nickname} imageUrl={imageUrl} />
        <p className="text-14pxr font-[500]">{nickname}</p>
      </button>
      {isActive && (
        <HamburgerMenuItem isActive={isActive} setIsActive={setIsActive} menuRef={menuRef} />
      )}
    </>
  );
}

import React from 'react';
import ProfileImage from './ProfileImage';

interface Props {
  nickname: string;
  imageUrl: string | null;
}

export default function Profile({ nickname, imageUrl }: Props) {
  return (
    <div className="flex items-center gap-10pxr">
      <ProfileImage nickname={nickname} imageUrl={imageUrl} />
      <p className="text-14pxr font-[500]">{nickname}</p>
    </div>
  );
}

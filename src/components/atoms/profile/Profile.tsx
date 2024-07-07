import React from 'react';
import ProfileImage from './ProfileImage';

interface Props {
  name: string;
  src: string;
}

export default function Profile({ name, src }: Props) {
  return (
    <div className="flex items-center gap-10pxr">
      <ProfileImage src={src} />
      <p className="text-14pxr font-[500] text-var-black">{name}</p>
    </div>
  );
}

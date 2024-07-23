'use client';

import Profile from '@/components/atoms/profile/Profile';
import useUser from '@/store/useUser';
import React from 'react';

export default function HeaderProfile() {
  const { user } = useUser();
  if (!user) return;
  return <Profile nickname={user.nickname} imageUrl={user.profileImageUrl} />;
}

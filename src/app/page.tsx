'use client';

import Header from '@/components/templates/header/Header';
import Banner from '@/components/templates/main/Banner';
import Main from '@/components/templates/main/Main';
import { cookie } from '@/lib/cookie';
import { getActivitiesQueryOptions } from '@/queries/activities/get-activities';
import { useQuery } from '@tanstack/react-query';

const USER = {
  id: 593,
  email: 'daeun@codeit.com',
  nickname: '오다은',
  profileImageUrl: null,
  createdAt: '2024-07-08T19:06:23.037Z',
  updatedAt: '2024-07-08T19:06:23.037Z',
};

export default function Home() {
  const { data } = useQuery(getActivitiesQueryOptions);

  return (
    <>
      <Header user={USER} />
      {data && <Banner activity={data?.activities[0]} />}
      <Main />
    </>
  );
}

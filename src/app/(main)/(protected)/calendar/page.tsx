import { ipCheck } from '@/app/action/ip-check';
import MyReservation from '@/components/templates/mypage/MyReservation';
import { getInstance } from '@/lib/axios';
import redis from '@/lib/redis';
import axios from 'axios';
import { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import os from 'os';

export const metadata: Metadata = {
  title: '예약 연황 | Global Nomad',
  description: 'global nomad 내 체험 현황 페이지입니다.',
};

export default async function page() {
  const apiInstance = getInstance();
  const myActivtyListResponse = await apiInstance.get(`my-activities`);
  const myActivtyList = myActivtyListResponse.data;

  return <MyReservation myActivityList={myActivtyList} />;
}

import { ipCheck } from '@/app/action/ip-check';
import ReservationClient from '@/components/templates/reservation/ReservationClient';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '예약 내역 | Global Nomad',
  description: 'global nomad 예약 내역 페이지입니다.',
};

export default async function ReservationList() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/signin?redirect=anotherlogin');
  }

  return <ReservationClient />;
}

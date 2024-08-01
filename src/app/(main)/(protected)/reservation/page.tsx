import { ipCheck } from '@/app/action/ip-check';
import ReservationClient from '@/components/templates/reservation/ReservationClient';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'reservation',
  description: '예약 내역',
};

export default async function ReservationList() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/calendar');
  }

  return <ReservationClient />;
}

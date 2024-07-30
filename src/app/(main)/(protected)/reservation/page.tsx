import ReservationClient from '@/components/templates/reservation/ReservationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'reservation',
  description: '예약 내역',
};

export default function ReservationList() {
  return <ReservationClient />;
}

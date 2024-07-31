import ReservationClient from '@/components/templates/reservation/ReservationClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '예약 내역 | Global Nomad',
  description: 'global nomad 예약 내역 페이지입니다.',
};

export default function ReservationList() {
  return <ReservationClient />;
}

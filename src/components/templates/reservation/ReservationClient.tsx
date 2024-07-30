'use client';

import { useState } from 'react';
import { ReservationStatus } from '@/types/reservation';
import Header from './Header';
import Main from './Main';

export default function ReservationClient() {
  const [status, setStatus] = useState<ReservationStatus | null>(null);

  return (
    <div className="flex flex-col gap-16pxr lg:gap-24pxr">
      <Header setStatus={setStatus} />
      <Main status={status} />
    </div>
  );
}

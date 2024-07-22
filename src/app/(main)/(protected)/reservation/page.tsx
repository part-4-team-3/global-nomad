'use client';

import { useState } from 'react';
import { ReservationStatus } from '@/types/reservation';
import Header from '@/components/templates/reservation/Header';
import Main from '@/components/templates/reservation/Main';

export default function ReservationList() {
  const [status, setStatus] = useState<ReservationStatus | null>(null);

  return (
    <div className="flex flex-col gap-16pxr lg:gap-24pxr">
      <Header setStatus={setStatus} />
      <Main status={status} />
    </div>
  );
}

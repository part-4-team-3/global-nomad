'use client';

import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import { RESERVATION_LABELS, ReservationStatus, isReservationStatus } from '@/types/reservation';

interface Props {
  status: ReservationStatus | null;
  setStatus: (status: ReservationStatus | null) => void;
}

export default function Header({ setStatus, status }: Props) {
  const text = status === null ? '전체' : RESERVATION_LABELS[status];

  return (
    <div className="flex h-53pxr w-full items-center justify-between">
      <h1 className="h-38pxr text-32pxr font-bold">예약 내역</h1>
      <div className="hidden h-53pxr w-160pxr text-18pxr md2:block">
        <DropdownMenu text={text} className="rounded-[15px] bg-white">
          <button
            className="block w-full py-[9px] text-center md:py-[18px]"
            onClick={() => setStatus(null)}
          >
            전체
          </button>
          {Object.entries(RESERVATION_LABELS).map(([key, label]) => {
            if (isReservationStatus(key)) {
              return (
                <button
                  className="block w-full py-[9px] text-center md:py-[18px]"
                  key={key}
                  onClick={() => setStatus(key)}
                >
                  {label}
                </button>
              );
            }
            return null;
          })}
        </DropdownMenu>
      </div>
    </div>
  );
}

import DropdownMenu from '@/components/molecules/dropdown-menu/DropdownMenu';
import { RESERVATION_LABELS, ReservationStatus, isReservationStatus } from '@/types/reservation';

interface Props {
  setStatus: (status: ReservationStatus | null) => void;
}

export default function Header({ setStatus }: Props) {
  return (
    <div className="flex h-53pxr w-full items-center justify-between">
      <h1 className="h-38pxr text-32pxr font-bold">예약 내역</h1>
      <div className="h-53pxr w-160pxr text-18pxr">
        <DropdownMenu text="상태">
          <button className="w-full" onClick={() => setStatus(null)}>
            전체
          </button>
          {Object.entries(RESERVATION_LABELS).map(([key, label]) => {
            if (isReservationStatus(key)) {
              return (
                <button className="w-full" key={key} onClick={() => setStatus(key)}>
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

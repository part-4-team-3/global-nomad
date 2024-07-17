import { ReservedSchedule } from '@/types/schedule';
import { useEffect, useState } from 'react';

interface ScheduleStatus {
  pending: number;
  confirmed: number;
  declined: number;
}

/**
 * `useHandleStatusCount`는 선택된 일정에 대한 상태별 카운트를 관리하는 커스텀 훅입니다.
 *
 * @param selectedSchedule - 선택된 일정의 상세 정보입니다. `ReservedSchedule` 타입이거나, 선택된 일정이 없을 경우 `null`입니다.
 *                           이 객체는 각 상태(`pending`, `confirmed`, `declined`)에 대한 카운트 정보를 포함합니다.
 * @returns `statusCount` 상태를 반환합니다. 이는 각 상태별 카운트를 포함하는 `ScheduleStatus` 객체입니다.
 *
 * 사용 예:
 * const { statusCount } = useHandleStatusCount(selectedSchedule);
 *
 * - `statusCount`: 각 상태(`pending`, `confirmed`, `declined`)별 카운트를 포함하는 `ScheduleStatus` 객체입니다.
 *                  예를 들어, `statusCount.pending`은 대기 중인 예약의 수를 나타냅니다.
 */
export const useHandleStatusCount = (selectedSchedule: ReservedSchedule | null) => {
  const [statusCount, setStatusCount] = useState<ScheduleStatus>({
    pending: 0,
    confirmed: 0,
    declined: 0,
  });

  const handleChangeStatusCount = ({ declined, confirmed, pending }: ScheduleStatus) => {
    setStatusCount((prev) => {
      return {
        ...prev,
        pending,
        confirmed,
        declined,
      };
    });
  };

  useEffect(() => {
    handleChangeStatusCount(selectedSchedule?.count ?? { declined: 0, confirmed: 0, pending: 0 });
  }, [selectedSchedule]);

  return { statusCount };
};

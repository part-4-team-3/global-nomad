import { ReservedSchedule } from '@/types/schedule';
import { useEffect, useState } from 'react';

/**
 * `useHandleSelectedSchedule`는 선택된 일정의 상세 정보를 관리하는 커스텀 훅입니다.
 *
 * @param myScheduleByDate - 특정 날짜에 예약된 모든 일정의 배열입니다. `ReservedSchedule[]` 타입이며, `null`일 수도 있습니다.
 *                           이 배열은 각 일정의 시작 시간과 종료 시간 정보를 포함합니다.
 * @param selectedScheduleTime - 사용자가 선택한 일정의 시간입니다. 문자열 타입으로, "시작시간~종료시간"의 형식을 따릅니다.
 * @returns `selectedSchedule` 상태를 반환합니다. 이는 사용자가 선택한 일정의 상세 정보를 포함하는 `ReservedSchedule` 객체이거나,
 *          일정이 선택되지 않았을 경우 `null`입니다.
 *
 * 사용 예:
 * const { selectedSchedule } = useHandleSelectedSchedule(myScheduleByDate, "09:00~12:00");
 *
 * - `selectedSchedule`: 사용자가 선택한 일정의 상세 정보를 포함하는 `ReservedSchedule` 객체입니다. 일정이 선택되지 않았다면 `null`입니다.
 */
export const useHandleSelectedSchedule = (
  myScheduleByDate: ReservedSchedule[] | null,
  selectedScheduleTime: string,
) => {
  const [selectedSchedule, setSelectedSchedule] = useState<ReservedSchedule | null>(null);

  useEffect(() => {
    if (!myScheduleByDate) return;
    const findSelectedSchedule = () => {
      const isSelectedSchedule = myScheduleByDate.find((schedule) => {
        return schedule.startTime + '~' + schedule.endTime === selectedScheduleTime;
      });

      setSelectedSchedule(isSelectedSchedule ?? null);
    };

    findSelectedSchedule();
  }, [selectedScheduleTime, myScheduleByDate, selectedSchedule]);

  return { selectedSchedule };
};

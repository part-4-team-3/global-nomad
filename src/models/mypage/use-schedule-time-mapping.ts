import { ReservedSchedule } from '@/types/schedule';
import { useEffect, useState } from 'react';

/**
 * `useScheduleTimeMapping`은 예약된 일정 목록을 받아 시작 시간과 종료 시간을 결합한 문자열 배열로 변환하는 커스텀 훅입니다.
 *
 * @param scheduleList - 예약된 일정의 배열입니다. `ReservedSchedule[]` 타입이며, 각 일정은 `startTime`과 `endTime` 속성을 가집니다.
 *                       이 파라미터는 선택적이며, 정의되지 않은 경우 훅은 빈 배열을 반환합니다.
 * @returns 객체를 반환합니다. 이 객체는 다음 두 속성을 포함합니다:
 *          - `scheduleTimeList`: 시작 시간과 종료 시간이 ~ 문자로 결합된 문자열 배열입니다. 예: [`09:00~12:00`, `13:00~15:00`]
 *          - `setScheduleTimeList`: `scheduleTimeList` 상태를 업데이트하는 함수입니다.
 *
 * 사용 예:
 * const { scheduleTimeList, setScheduleTimeList } = useScheduleTimeMapping(scheduleList);
 *
 * - `scheduleTimeList`: 변환된 시간 문자열 배열입니다. 예: ["09:00~12:00", "13:00~15:00"]
 * - `setScheduleTimeList`: `scheduleTimeList` 상태를 수동으로 업데이트할 때 사용할 수 있는 함수입니다.
 */
export const useScheduleTimeMapping = (scheduleList: ReservedSchedule[] | undefined) => {
  const [scheduleTimeList, setScheduleTimeList] = useState<string[]>([]);

  useEffect(() => {
    if (!scheduleList) return;

    const scheduleTimeList = scheduleList.map((schedule) => {
      return schedule.startTime + '~' + schedule.endTime;
    });

    setScheduleTimeList([...scheduleTimeList]);
  }, [scheduleList]);

  return { scheduleTimeList, setScheduleTimeList };
};

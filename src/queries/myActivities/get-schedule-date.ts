import { useQuery } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { getInstance } from '@/lib/axios';
import { ReservationListByTime } from '@/types/reservation';
import { ReservedSchedule } from '@/types/schedule';

interface GetScheduleByDateResponse {
  data: ReservedSchedule[];
}

/**
 * `useGetScheduleByDate`는 특정 활동 ID와 날짜에 대한 예약 일정을 조회하는 커스텀 훅입니다.
 *
 * @param activityId - 조회할 활동의 고유 ID입니다. 숫자 타입입니다.
 * @param date - 조회할 날짜입니다. 문자열 타입으로, "YYYY-MM-DD" 형식을 따릅니다.
 * @returns `useQuery` 훅의 반환 객체입니다. 이 객체는 로딩 상태, 에러 정보, 조회된 데이터 등을 포함합니다.
 *          반환되는 데이터 타입은 `GetScheduleByDateResponse`입니다.
 *
 * 사용 예:
 * const { data, isLoading, isError } = useGetScheduleByDate(1, "2023-04-01");
 *
 * - `data`: 조회된 예약 일정 데이터입니다. `GetScheduleByDateResponse` 타입을 가집니다.
 * - `isLoading`: 데이터 로딩 중인지 여부를 나타냅니다. boolean 타입입니다.
 * - `error`: 요청 중 발생한 에러 정보입니다. 요청이 성공적으로 완료되면 `null`입니다.
 */
export const useGetScheduleByDate = (activityId: number, date: string) => {
  return useQuery<GetScheduleByDateResponse>({
    queryKey: myActivitiesKeys.getMyScheduleByDate(activityId, date),
    queryFn: () => {
      const apiInstance = getInstance();
      return apiInstance.get(`my-activities/reserve-schedule/${activityId}?date=${date}`);
    },
    enabled: !!activityId && !!date,
  });
};

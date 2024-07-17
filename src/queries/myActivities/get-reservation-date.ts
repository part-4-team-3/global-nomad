import { useQuery } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { getInstance } from '@/lib/axios';

/**
 * `useGetReservationByDate`는 특정 활동 ID와 관련된 예약 정보를 조회하는 커스텀 훅입니다.
 *
 * @param activityId - 조회할 활동의 고유 ID입니다. 숫자 타입입니다.
 * @param cursorId - 페이징 처리를 위한 커서 ID입니다. 숫자 타입이며, 첫 페이지 조회 시 `null`일 수 있습니다.
 * @param size - 한 페이지에 표시할 예약의 수입니다. 숫자 타입입니다.
 * @param scheduleId - 조회할 일정의 고유 ID입니다. 숫자 타입이며, 특정 일정에 대한 조회가 아닐 경우 `null`일 수 있습니다.
 * @param status - 조회할 예약의 상태입니다. `'pending'`, `'confirmed'`, `'declined'` 중 하나입니다.
 * @returns `useQuery` 훅의 반환 객체입니다. 이 객체는 로딩 상태, 에러 정보, 조회된 데이터 등을 포함합니다.
 *          반환되는 데이터 타입은 API 응답에 따라 달라집니다.
 *
 * 사용 예:
 * const { data, isLoading, isError } = useGetReservationByDate(1, null, 10, null, 'confirmed');
 *
 * - `data`: 조회된 예약 정보 데이터입니다. API 응답 타입에 따라 달라집니다.
 * - `isLoading`: 데이터 로딩 중인지 여부를 나타냅니다. boolean 타입입니다.
 * - `error`: 요청 중 발생한 에러 정보입니다. 요청이 성공적으로 완료되면 `null`입니다.
 */
export const useGetReservationByDate = (
  activityId: number,
  cursorId: number | null,
  size: number,
  scheduleId: number | null,
  status: 'pending' | 'confirmed' | 'declined',
) => {
  return useQuery({
    queryKey: myActivitiesKeys.getMyReservationByDate(
      activityId,
      cursorId,
      size,
      scheduleId,
      status,
    ),
    queryFn: () => {
      const apiInstance = getInstance();
      const url = cursorId
        ? `my-reservations/reservations/${activityId}?cursorId=${cursorId}&size=${size}&scheduleId=${scheduleId}&status=${status}`
        : `my-reservations/reservations/${activityId}?size=${size}&scheduleId=${scheduleId}&status=${status}`;
      return apiInstance.get(url);
    },
    enabled: !!(activityId && scheduleId && status),
  });
};

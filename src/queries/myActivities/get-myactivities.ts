import { MyActivityList } from '@/types/activity';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { myActivitiesKeys } from './query-keys';
import { apiInstance, getInstance } from '@/lib/axios';
import axios, { AxiosResponse } from 'axios';

interface GetMyActivityListData {
  size: number;
  cursorId: number | null;
}

interface MyActivityListResponse {
  data: MyActivityList;
}

/**
 * 사용자의 Activity 목록을 가져오는 커스텀 훅입니다.
 *
 * 이 훅은 `useQuery`를 사용하여 비동기적으로 사용자의 활동 목록을 가져옵니다.
 * 가져온 데이터는 캐싱되어 다음 요청 시 빠르게 제공될 수 있습니다.
 *
 * @param data - 활동 목록을 가져오기 위한 요청 데이터입니다.
 *               `size`는 가져올 항목의 수를 지정하는 number 타입의 필수 값입니다.
 *               `cursorId`는 페이지네이션을 위한 마지막 항목의 ID를 지정하는 number 타입이며, 없을 경우 null입니다.
 * @returns `useQuery`의 결과로, MyActivityList 타입의 데이터와 관련된 여러 상태와 메서드를 포함합니다.
 */
export const useGetMyActivityList = (data: GetMyActivityListData) => {
  const { cursorId, size } = data;

  return useQuery<MyActivityListResponse>({
    queryKey: myActivitiesKeys.getMyActivities(cursorId, size),
    queryFn: () => {
      const apiInstance = getInstance();
      const url = data.cursorId
        ? `my-activities?size=${size}&cursorId=${cursorId}`
        : `my-activities?size=${size}`;

      return apiInstance.get(url);
    },

    enabled: !!size,
  });
};

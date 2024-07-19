import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';

interface ApiResponse {
  activityImageUrl: 'string';
}

/** 이미지 등록 함수 */
const submit = async (body: FormData) => {
  const instance = getInstance();
  const response = await instance.post<ApiResponse>('activities/image', body);
  return response.data;
};

/**  이미지 등록 Mutation Options */
export const submitActivityImageMutationOptions: UseMutationOptions<ApiResponse, Error, FormData> =
  {
    mutationFn: submit,
    onError: (error: Error) => {
      alert('이미지 등록에 실패했습니다. 다시 시도해주세요.');
    },
  };

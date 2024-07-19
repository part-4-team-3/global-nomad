import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';

interface ApiResponse {
  activityImageUrl: 'string';
}

const submit = async (body: FormData) => {
  const instance = getInstance();
  const response = await instance.post<ApiResponse>('activities/image', body, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const submitMutationOptions: UseMutationOptions<ApiResponse, Error, FormData> = {
  mutationFn: submit,
  onError: (error: Error) => {
    alert('이미지 등록에 실패했습니다. 다시 시도해주세요.');
  },
};

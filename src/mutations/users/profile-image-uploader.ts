import { getInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';

interface ApiResponse {
  profileImageUrl: string;
}

/** 이미지 등록 함수 */
const submit = async (body: FormData) => {
  const instance = getInstance();
  const response = await instance.post<ApiResponse>('users/me/image', body);
  return response.data;
};

/** 이미지 수정 함수 */
const patch = async (body: ApiResponse) => {
  const instance = getInstance();
  const response = await instance.patch('users/me', body);
  return response.data;
};

/**  이미지 등록 Mutation Options */
export const submitProfileImageMutationOptions: UseMutationOptions<ApiResponse, Error, FormData> = {
  mutationFn: submit,
  onError: (error: Error) => {
    alert('이미지 등록에 실패했습니다. 다시 시도해주세요.');
  },
};

/** 이미지 수정 Mutation Options */
export const updateProfileImageMutationOptions: UseMutationOptions<
  ApiResponse,
  Error,
  ApiResponse
> = {
  mutationFn: patch,
  onError: (error: Error) => {
    alert('이미지 업데이트에 실패했습니다. 다시 시도해주세요.');
  },
};

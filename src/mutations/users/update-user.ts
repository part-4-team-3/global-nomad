import { getInstance } from '@/lib/axios';
import { User } from '@/types/user';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface Body {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

const updateUser = async (body: Body) => {
  const instance = getInstance();
  const res = await instance.patch<User>('/users/me', body);

  return res.data;
};

export const updateUserMutationOptions: UseMutationOptions<User, Error, Body> = {
  mutationFn: updateUser,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 내 정보 수정에 실패하였습니다.';

    if (error instanceof AxiosError) {
      toast(error.response?.data.data.message ?? defaultMsg);
      return;
    }

    toast(defaultMsg);
  },
};

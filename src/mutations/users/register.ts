import { getInstance } from '@/lib/axios';
import { User } from '@/types/user';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface RegisterBody {
  email: string;
  nickname: string;
  password: string;
}

const register = async (body: RegisterBody) => {
  const instance = getInstance();
  const res = await instance.post<User>('/users', body);

  return res.data;
};

export const registerMutationOptions: UseMutationOptions<User, Error, RegisterBody> = {
  mutationFn: register,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 회원가입에 실패하였습니다.';

    if (error instanceof AxiosError) {
      toast(error.response?.data.data.message ?? defaultMsg);
      return;
    }

    toast(defaultMsg);
  },
};

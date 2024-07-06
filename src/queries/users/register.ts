import { apiInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError, isAxiosError } from 'axios';

export interface User {
  id: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface RegisterBody {
  email: string;
  nickname: string;
  password: string;
}

const register = async (body: RegisterBody) => {
  const res = await apiInstance.post<User>('/users', body);
  return res.data;
};

export const registerMutationOptions: UseMutationOptions<User, Error, RegisterBody> = {
  mutationFn: register,
  onSuccess: (data) => {
    alert('회원가입 성공'); // alert은 이후 toast 라이브러리 or 직접 만들어서 교체
  },
  onError: (error: Error) => {
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
      return;
    }

    alert(error.message);
  },
};

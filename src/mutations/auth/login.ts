import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '@/types/user';
import { toast } from 'react-toastify';
import axios, { isAxiosError } from 'axios';

interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const login = async (data: LoginBody) =>
  (await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`, data)).data;

export const loginMutationOptions: UseMutationOptions<LoginResponse, Error, LoginBody> = {
  mutationFn: async (data) => login(data),
  onError: (err) => {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      switch (status) {
        case 401:
          toast('이미 로그인이 되어있는 계정입니다.');
          break;
        default:
          toast('이메일, 비밀번호가 일치하지 않습니다.');
      }
    }
  },
};

export const checkPasswordMutationOptions: UseMutationOptions<LoginResponse, Error, LoginBody> = {
  mutationFn: async (data) => login(data),
  onError: () => {
    toast('비밀번호가 틀렸습니다.');
  },
};

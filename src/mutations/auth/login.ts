import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '@/types/user';
import { toast } from 'react-toastify';
import axios from 'axios';

interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const loginMutationOptions: UseMutationOptions<LoginResponse, Error, LoginBody> = {
  mutationFn: async (data) =>
    (await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}login`, data)).data,
  onError: () => {
    toast('이메일, 비밀번호가 일치하지 않습니다.');
  },
};

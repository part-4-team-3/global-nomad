import { apiInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '@/types/user';
import { toast } from 'react-toastify';

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
  mutationFn: (data) => apiInstance.post<LoginBody, LoginResponse>('/auth/login', data),
  onError: () => {
    toast('이메일, 비밀번호가 일치하지 않습니다.');
  },
};

import { apiInstance } from '@/lib/axios';
import { cookie } from '@/lib/cookie';
import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '../users/register';
import { AxiosError } from 'axios';

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const login = async (body: LoginBody) => {
  const { data } = await apiInstance.post<LoginResponse>('/auth/login', body);
  return data;
};

export const loginMutationOptions: UseMutationOptions<LoginResponse, Error, LoginBody> = {
  mutationFn: login,
  onSuccess: (data) => {
    cookie.setCookie('accessToken', data.accessToken);
    cookie.setCookie('refreshToken', data.refreshToken);
  },
  onError: (error: Error) => {
    if (error instanceof AxiosError) {
      alert(error.response?.data.message);
      return;
    }

    alert(error.message);
  },
};

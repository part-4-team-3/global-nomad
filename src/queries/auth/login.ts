import { apiInstance } from '@/lib/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { User } from '../users/register';
import { onLoginError } from '@/models/auth/login-models';

interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

const login = async (body: LoginBody) => {
  const data = await apiInstance.post<LoginBody, LoginResponse>('/auth/login', body);
  return data;
};

export const loginMutationOptions: UseMutationOptions<LoginResponse, Error, LoginBody> = {
  mutationFn: login,
  onError: onLoginError,
};

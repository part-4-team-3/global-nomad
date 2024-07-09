import { apiInstance } from '@/lib/axios';
import { onRegisterError } from '@/models/auth/register-models';
import { User } from '@/types/user';
import { UseMutationOptions } from '@tanstack/react-query';

interface RegisterBody {
  email: string;
  nickname: string;
  password: string;
}

const register = async (body: RegisterBody) => {
  const res = await apiInstance.post<RegisterBody, User>('/users', body);
  return res;
};

export const registerMutationOptions: UseMutationOptions<User, Error, RegisterBody> = {
  mutationFn: register,
  onError: onRegisterError,
};

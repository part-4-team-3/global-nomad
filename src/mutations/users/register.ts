import { apiInstance } from '@/lib/axios';
import { User } from '@/types/user';
import { UseMutationOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
  onError: (error: Error) => {
    const status = Number(error.message);

    if (status === 409) {
      toast('중복된 이메일입니다.');
    }
  },
};

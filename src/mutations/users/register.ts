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

interface CheckDuplicateBody {
  email: string;
}

interface CheckDuplicateResponse {
  duplicate: boolean;
}

const checkDuplicateEmail = async (body: CheckDuplicateBody) => {
  const instance = getInstance();
  const res = await instance.post<CheckDuplicateResponse>('/check-duplicate', body);

  return res.data;
};

export const checkDuplicateMutationOptions: UseMutationOptions<
  CheckDuplicateResponse,
  Error,
  CheckDuplicateBody
> = {
  mutationFn: checkDuplicateEmail,
  onError: () => {
    toast('알 수 없는 오류로 이메일 중복 확인에 실패하였습니다.');
  },
};

interface SendEmailBody {
  email: string;
}

interface SendEmailResponse {
  code: string;
}

const sendEmail = async (body: SendEmailBody) => {
  const instance = getInstance();
  const res = await instance.post<SendEmailResponse>('/send-email', body);

  return res.data;
};

export const sendEmailMutationOptions: UseMutationOptions<SendEmailResponse, Error, SendEmailBody> =
  {
    mutationFn: sendEmail,
    onError: () => {
      toast('알 수 없는 오류로 이메일 전송에 실패하였습니다.');
    },
  };

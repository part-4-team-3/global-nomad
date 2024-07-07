import { TOAST_DEFAULT } from '@/constant/toast-option';
import { AxiosError } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const onRegisterSuccess = (router: AppRouterInstance) => {
  toast('회원가입 되었습니다.', {
    ...TOAST_DEFAULT,
    onClose: () => {
      router.push('/signin');
    },
    onClick: () => {
      router.push('/signin');
    },
  });
};

export const onRegisterError = (error: Error) => {
  if (error instanceof AxiosError) {
    toast(error.response?.data.message, TOAST_DEFAULT);
    return;
  }

  const status = Number(error.message);

  if (status === 409) {
    toast('중복된 이메일입니다.', TOAST_DEFAULT);
  }
};

import { TOAST_DEFAULT } from '@/constant/toast-option';
import { cookie } from '@/lib/cookie';
import { LoginResponse } from '@/queries/auth/login';
import { User } from '@/types/user';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

export const onLoginSuccess = (
  data: LoginResponse,
  router: AppRouterInstance,
  setUser: (user: User) => void,
) => {
  cookie.setCookie('accessToken', data.accessToken);
  cookie.setCookie('refreshToken', data.refreshToken);
  setUser(data.user);

  router.push('/');
};

export const onLoginError = () => {
  toast('이메일, 비밀번호가 일치하지 않습니다.', TOAST_DEFAULT);
};

'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthInput from '@/components/molecules/input/AuthInput';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import FORM_OPTIONS from '@/constant/form-option';
import Button from '@/components/atoms/button/Button';
import { loginMutationOptions } from '@/mutations/auth/login';
import useUser from '@/store/useUser';
import { revalidate } from '@/lib/revalidate';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectQueryString = searchParams.get('redirect');
  const isAnotherLogin = redirectQueryString === 'anotherlogin';

  useEffect(() => {
    if (isAnotherLogin) {
      toast('다른 기기에서 로그인 되었습니다. 다시 로그인 해주세요.');
    }
  }, [isAnotherLogin]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setUser } = useUser();

  const mutation = useMutation({
    ...loginMutationOptions,
    onSuccess: (data) => {
      setUser(data.user);
      revalidate('/');
      router.push('/');
    },
  });

  const submit = (data: LoginData) => {
    mutation.mutate(data);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <div className="flex w-full flex-col gap-28pxr">
        <div>
          <Controller
            control={control}
            name={FORM_OPTIONS.email.name}
            rules={FORM_OPTIONS.email.rules}
            defaultValue=""
            render={({ field }) => (
              <AuthInput
                id={FORM_OPTIONS.email.name}
                labelText="이메일"
                hasError={errors.email !== undefined}
                placeholder={FORM_OPTIONS.email.placeholder}
                maxLength={30}
                {...field}
              />
            )}
          />
          {errors.email && <div className={FORM_OPTIONS.errorMsgStyle}>{errors.email.message}</div>}
        </div>
        <div>
          <Controller
            control={control}
            name={FORM_OPTIONS.loginPassword.name}
            rules={FORM_OPTIONS.loginPassword.rules}
            defaultValue=""
            render={({ field }) => (
              <PasswordInput
                id={FORM_OPTIONS.loginPassword.name}
                hasError={errors.password !== undefined}
                placeholder={FORM_OPTIONS.loginPassword.placeholder}
                {...field}
              />
            )}
          />
          {errors.password && (
            <div className={FORM_OPTIONS.errorMsgStyle}>{errors.password.message}</div>
          )}
        </div>
        <Button type="submit" text="로그인 하기" size="l" color="black" disabled={!isValid} />
      </div>
    </form>
  );
}

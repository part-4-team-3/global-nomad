'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/molecules/input/AuthInput';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import FORM_OPTIONS from '@/constant/form-option';
import Button from '@/components/atoms/button/Button';
import { loginMutationOptions } from '@/queries/auth/login';
import { onLoginSuccess } from '@/models/auth/login-models';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
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

  const mutation = useMutation(loginMutationOptions);

  const submit = (data: LoginData) => {
    mutation.mutate(data, {
      onSuccess: (data) => onLoginSuccess(data, router),
    });
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

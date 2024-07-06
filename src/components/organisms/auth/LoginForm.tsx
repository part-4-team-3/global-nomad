'use client';

import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import AuthInput from '@/components/molecules/input/AuthInput';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import FORM_OPTIONS from '@/constant/formOption';
import { loginMutationOptions } from '@/queries/auth/login';

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
    setError,
  } = useForm<LoginData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation(loginMutationOptions);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        mutation.mutate({ email: data.email, password: data.password });
      })}
    >
      <div className="flex flex-col gap-[16px]">
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
        <button className="w-full border" type="submit" disabled={!isValid}>
          로그인 하기
        </button>
        {/* 공용 컴포넌트 button으로 교체할 예정 */}
      </div>
    </form>
  );
}

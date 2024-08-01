'use client';

import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/atoms/input/Input';
import FORM_OPTIONS from '@/constant/form-option';
import Button from '@/components/atoms/button/Button';
import { useMutation } from '@tanstack/react-query';
import { checkPasswordMutationOptions } from '@/mutations/auth/login';
import useUser from '@/store/useUser';
import PasswordInput from '@/components/molecules/input/PasswordInput';

interface Props {
  setPassword: (password: string) => void;
}

interface Data {
  password: string;
}

export default function PasswordCheckForm({ setPassword }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Data>({
    mode: 'onChange',
    defaultValues: {
      password: '',
    },
  });

  const { user } = useUser();

  const mutation = useMutation({
    ...checkPasswordMutationOptions,
    onSuccess: () => {
      setPassword(watch('password'));
    },
  });

  const submit = ({ password }: Data) => {
    if (user) mutation.mutate({ email: user.email, password });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1 className="mb-[24px] text-center text-32pxr font-bold md:text-start">비밀번호 확인</h1>
      <div className="flex h-360pxr flex-col items-center justify-center gap-[10px] rounded-[10px] bg-white px-[20px] shadow-md">
        <p className="text-center">회원정보 수정을 위한 비밀번호 확인 절차입니다.</p>
        <div className="mt-[10px] flex w-full max-w-500pxr flex-col gap-[10px] md2:flex-row">
          <Controller
            control={control}
            name="password"
            rules={{ required: '비밀번호를 입력해 주세요.' }}
            render={({ field }) => (
              <div className="w-full grow">
                <PasswordInput
                  size="full"
                  label=""
                  hasError={errors.password !== undefined}
                  {...field}
                />
                {errors.password && (
                  <div className={FORM_OPTIONS.errorMsgStyle}>{errors.password.message}</div>
                )}
              </div>
            )}
          />
          <Button
            className="mb-[30px] h-54pxr w-full md2:mt-[16px] md2:w-150pxr"
            type="submit"
            text="확인"
            color="black"
          />
        </div>
      </div>
    </form>
  );
}

'use client';

import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/atoms/input/Input';
import FORM_OPTIONS from '@/constant/form-option';
import Button from '@/components/atoms/button/Button';
import { useMutation } from '@tanstack/react-query';
import { checkPasswordMutationOptions } from '@/mutations/auth/login';
import useUser from '@/store/useUser';

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
      <div className="mb-24pxr flex h-48pxr items-start justify-between overflow-hidden text-ellipsis">
        <h1 className="text-32pxr font-bold">내 정보 - 비밀번호 확인</h1>
        <Button className="h-48pxr w-120pxr" type="submit" text="확인" color="black" />
      </div>
      <Controller
        control={control}
        name="password"
        rules={{ required: '비밀번호를 입력해 주세요.' }}
        render={({ field }) => (
          <div>
            <label className="mb-16pxr block text-24pxr font-bold" htmlFor="password">
              비밀번호 확인
            </label>
            <Input size="full" hasError={errors.password !== undefined} {...field} />
            {errors.password && (
              <div className={FORM_OPTIONS.errorMsgStyle}>{errors.password.message}</div>
            )}
          </div>
        )}
      />
    </form>
  );
}

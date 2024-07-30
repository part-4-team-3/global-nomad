'use client';

import { Controller, useForm } from 'react-hook-form';
import AuthInput from '@/components/molecules/input/AuthInput';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import FORM_OPTIONS from '@/constant/form-option';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/button/Button';
import { registerMutationOptions } from '@/mutations/users/register';
import { toast } from 'react-toastify';

interface RegisterData {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
    },
  });

  const mutation = useMutation({
    ...registerMutationOptions,
    onSuccess: () => {
      toast('회원가입 되었습니다.', {
        onClose: () => {
          router.push('/signin');
        },
        onClick: () => {
          router.push('/signin');
        },
      });
    },
  });

  const submit = ({ email, nickName: nickname, password }: RegisterData) => {
    mutation.mutate({ email, nickname, password });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(submit)}>
      <div className="flex w-full flex-col gap-[16px]">
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
            name={FORM_OPTIONS.nickName.name}
            rules={FORM_OPTIONS.nickName.rules}
            defaultValue=""
            render={({ field }) => (
              <AuthInput
                id={FORM_OPTIONS.nickName.name}
                labelText="닉네임"
                hasError={errors.nickName !== undefined}
                placeholder={FORM_OPTIONS.nickName.placeholder}
                maxLength={10}
                {...field}
              />
            )}
          />
          {errors.nickName && (
            <div className={FORM_OPTIONS.errorMsgStyle}>{errors.nickName.message}</div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name={FORM_OPTIONS.password.name}
            rules={FORM_OPTIONS.password.rules}
            defaultValue=""
            render={({ field }) => (
              <PasswordInput
                id={FORM_OPTIONS.password.name}
                hasError={errors.password !== undefined}
                placeholder={FORM_OPTIONS.password.placeholder}
                {...field}
              />
            )}
          />
          {errors.password && (
            <div className={FORM_OPTIONS.errorMsgStyle}>{errors.password.message}</div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name={FORM_OPTIONS.passwordCheck.name}
            rules={{
              ...FORM_OPTIONS.passwordCheck.rules,
              validate: () => {
                if (watch(FORM_OPTIONS.password.name) !== watch(FORM_OPTIONS.passwordCheck.name)) {
                  return FORM_OPTIONS.passwordCheck.validateMsg;
                }

                return true;
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <PasswordInput
                id={FORM_OPTIONS.passwordCheck.name}
                label="비밀번호 확인"
                hasError={errors.passwordCheck !== undefined}
                placeholder={FORM_OPTIONS.passwordCheck.placeholder}
                {...field}
              />
            )}
          />
          {errors.passwordCheck && (
            <div className={FORM_OPTIONS.errorMsgStyle}>{errors.passwordCheck.message}</div>
          )}
        </div>
        <Button type="submit" text="회원가입 하기" size="l" color="black" disabled={!isValid} />
      </div>
    </form>
  );
}

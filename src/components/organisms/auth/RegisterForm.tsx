'use client';

import { Controller, useForm } from 'react-hook-form';
import { registerMutationOptions } from '@/queries/users/register';
import AuthInput from '@/components/molecules/input/AuthInput';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import FORM_OPTIONS from '@/constant/formOption';

interface RegisterData {
  email: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setError,
  } = useForm<RegisterData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
    },
  });

  const mutation = useMutation(registerMutationOptions);

  const submit = (data: RegisterData) => {
    console.log(data);
    mutation.mutate({ email: data.email, nickname: data.nickName, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
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
            name={FORM_OPTIONS.nickName.name}
            rules={FORM_OPTIONS.nickName.rules}
            defaultValue=""
            render={({ field }) => (
              <AuthInput
                id={FORM_OPTIONS.nickName.name}
                labelText="닉네임"
                hasError={errors.nickName !== undefined}
                placeholder={FORM_OPTIONS.nickName.placeholder}
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
                isCheck
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
        <button className="w-full border" type="submit" disabled={!isValid}>
          회원가입 하기
        </button>
        {/* 공용 컴포넌트 button으로 교체할 예정 */}
      </div>
    </form>
  );
}

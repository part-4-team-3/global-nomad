'use client';

import Button from '@/components/atoms/button/Button';
import Input from '@/components/atoms/input/Input';
import FORM_OPTIONS from '@/constant/form-option';
import useUser from '@/store/useUser';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { updateUserMutationOptions } from './../../../mutations/users/update-user';
import { toast } from 'react-toastify';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import EditProfileImage from '@/components/atoms/edit-profile-image/EditProfileImage';
import { useState } from 'react';

interface Props {
  password: string;
}

interface Data {
  nickname: string;
  newPassword: string;
  newPasswordCheck: string;
  profileImageUrl: string;
}

const containerStyle = 'flex flex-col gap-[16px]';
const labelStyle = 'text-24pxr font-bold';

export default function MyPageForm({ password }: Props) {
  const { user, setUser } = useUser();
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<Data>({
    mode: 'onChange',
    defaultValues: {
      nickname: user?.nickname,
      newPassword: password,
      newPasswordCheck: password,
      profileImageUrl: user?.profileImageUrl || '',
    },
  });

  const mutation = useMutation({
    ...updateUserMutationOptions,
    onSuccess: (data) => {
      toast('내 정보가 수정되었습니다.');
      setUser(data);
      console.log(data.profileImageUrl);
    },
  });

  const submit = (data: Data) => {
    /* 초기 데이터 설정 */
    const payload: { nickname: string; newPassword: string; profileImageUrl?: string } = {
      nickname: data.nickname,
      newPassword: data.newPassword,
    };
    /* 프로필 이미지 있을 시 추가 */
    if (profileImageUrl) {
      payload.profileImageUrl = profileImageUrl;
    }

    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-24pxr flex h-48pxr items-start justify-between overflow-hidden text-ellipsis">
        <h1 className="text-32pxr font-bold">내 정보</h1>
        <Button className="h-48pxr w-120pxr" type="submit" text="저장하기" color="black" />
      </div>
      <EditProfileImage onProfileImageChange={setProfileImageUrl} />
      <div className="mt-[32px] flex flex-col gap-[32px] overflow-y-scroll scrollbar-hide">
        <Controller
          control={control}
          name="nickname"
          rules={{ required: '닉네임을 입력해 주세요.' }}
          render={({ field }) => (
            <div className={containerStyle}>
              <label htmlFor="nickname" className={labelStyle}>
                닉네임
              </label>
              <Input defaultValue={user?.nickname} size="full" {...field} />
              {errors.nickname && (
                <div className={FORM_OPTIONS.errorMsgStyle}>{errors.nickname.message}</div>
              )}
            </div>
          )}
        />
        <div className={containerStyle}>
          <label htmlFor="email" className={labelStyle}>
            이메일
          </label>
          <Input size="full" readOnly value={user?.email} />
        </div>
        <Controller
          control={control}
          name="newPassword"
          rules={FORM_OPTIONS.password.rules}
          render={({ field }) => (
            <div className={containerStyle}>
              <PasswordInput
                size="full"
                hasError={errors.newPassword !== undefined}
                placeholder="8자 이상 입력해 주세요"
                {...field}
              />
              {errors.newPassword && (
                <div className={FORM_OPTIONS.errorMsgStyle}>{errors.newPassword.message}</div>
              )}
            </div>
          )}
        />
        <Controller
          control={control}
          name="newPasswordCheck"
          rules={{
            ...FORM_OPTIONS.passwordCheck.rules,
            validate: () => {
              if (watch('newPassword', '')) {
                if (watch('newPassword') !== watch('newPasswordCheck')) {
                  return FORM_OPTIONS.passwordCheck.validateMsg;
                }
              }

              return true;
            },
          }}
          render={({ field }) => (
            <div className={containerStyle}>
              <PasswordInput
                size="full"
                hasError={errors.newPasswordCheck !== undefined}
                label="비밀번호 재입력"
                placeholder="비밀번호를 한번 더 입력해 주세요"
                {...field}
              />
              {errors.newPasswordCheck && (
                <div className={FORM_OPTIONS.errorMsgStyle}>{errors.newPasswordCheck.message}</div>
              )}
            </div>
          )}
        />
      </div>
    </form>
  );
}

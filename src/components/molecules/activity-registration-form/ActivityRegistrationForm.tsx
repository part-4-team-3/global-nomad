'use client';
import ImageUploader from '@/components/organisms/image-uploader/ImageUploader';
import ActivitieSettingInput from '../input/ActivitieSettingInput';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import Select from '../select/Select';
import Button from '@/components/atoms/button/Button';
import ReservationTimePicker from '../reservation-time-picker/ReservationTimePicker';

interface ActivitySettingData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: string[];
}

export default function ActivityRegistrationForm() {
  const { register, handleSubmit, control } = useForm<ActivitySettingData>();
  const [category, setCategory] = useState<string>('');

  const options = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  const onSubmit = (data: ActivitySettingData) => {
    {
      /* api 함수 추가 예정  */
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between">
        <h1>내 체험 등록</h1>
        <Button text="등록하기" color="black" size="s" type="submit" />
      </div>
      <div className="flex flex-col gap-24pxr">
        <ActivitieSettingInput text="제목" />
        {/* 수정 예정입니다 */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => <Select options={options} placeholder="카테고리" />}
        />
        <ActivitieSettingInput text="설명" />
        <label>가격</label>
        <ActivitieSettingInput text="가격" />
        <label>주소</label>
        <ActivitieSettingInput text="주소를 입력해주세요" />
        <label>예약 가능한 시간대</label>
        <ReservationTimePicker />
        <label>배너 이미지</label>
        <ImageUploader title="banner" />
        <label>소개 이미지</label>
        <ImageUploader title="intro" />
      </div>
    </form>
  );
}

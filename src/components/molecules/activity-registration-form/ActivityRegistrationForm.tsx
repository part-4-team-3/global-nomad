import Input from '@/components/atoms/input/Input';
import ImageUploader from '@/components/organisms/image-uploader/ImageUploader';
import ActivitieSettingInput from '../input/ActivitieSettingInput';
import { Controller, useForm } from 'react-hook-form';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { useState } from 'react';

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

  const onSubmit = (data: ActivitySettingData) => {
    {
      /* api 함수 추가 예정  */
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-24pxr">
        <ActivitieSettingInput text="제목" />
        {/* 수정 예정입니다 */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <DropdownMenu text="카테고리">
              <button
                className="p bg-white"
                type="button"
                onClick={() => field.onChange('문화 · 예술')}
              >
                문화 · 예술
              </button>
              <button type="button" onClick={() => field.onChange('식음료')}>
                식음료
              </button>
              <button type="button" onClick={() => field.onChange('스포츠')}>
                스포츠
              </button>
              <button type="button" onClick={() => field.onChange('투어')}>
                투어
              </button>
              <button type="button" onClick={() => field.onChange('관광')}>
                관광
              </button>
              <button type="button" onClick={() => field.onChange('웰빙')}>
                웰빙
              </button>
            </DropdownMenu>
          )}
        />
        <ActivitieSettingInput text="설명" />

        <label>가격</label>
        <ActivitieSettingInput text="가격" />
        <label>주소</label>
        <ActivitieSettingInput text="주소를 입력해주세요" />

        {/* 예약가능 시간대 */}
        {/* 이미지업로더 훅 수정 예정 */}
        <label>배너 이미지</label>
        <ImageUploader />
        <label>소개 이미지</label>
        <ImageUploader />
      </div>
    </form>
  );
}

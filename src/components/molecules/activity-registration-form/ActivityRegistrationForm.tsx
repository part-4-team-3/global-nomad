'use client';
import ImageUploader from '@/components/organisms/image-uploader/ImageUploader';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import Select from '../select/Select';
import Button from '@/components/atoms/button/Button';
import ReservationTimePicker from '../reservation-time-picker/ReservationTimePicker';
import Input from '@/components/atoms/input/Input';
import useTimeSlot from '@/models/activity/use-time-slot';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import AlertModal from '@/components/molecules/modal/AlertModal';
import useSubmitActivity from '@/models/activity/use-submit-activity';
import { ActivitySettingData } from '@/types/activity';

export default function ActivityRegistrationForm() {
  const { register, handleSubmit, control } = useForm<ActivitySettingData>();
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const {
    selectedDay,
    startTime,
    endTime,
    timeSlots,
    isCalendarOpen,
    handleFormatDayClick,
    setStartTime,
    setEndTime,
    handleAddTimeSlot,
    handleDeleteTimeSlot,
    handleCalendarOpen,
  } = useTimeSlot();
  const { uploadedImages, bannerImage, handleUploadImage, handleDeleteImage } = useImageUploader();
  const options = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

  /** 체험 등록 데이터 */
  const data: ActivitySettingData = {
    title,
    category,
    description,
    address,
    price,
    schedules: timeSlots,
    bannerImageUrl: bannerImage,
    subImageUrls: uploadedImages,
  };

  const { onSubmit } = useSubmitActivity(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <h1>내 체험 등록</h1>
          <Button text="등록하기" color="black" size="s" type="submit" />
        </div>
        <div className="flex flex-col gap-24pxr">
          <Input size="full" placeholder="제목" onChange={(e) => setTitle(e.target.value)} />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={options}
                placeholder="카테고리"
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  setCategory(value);
                }}
              />
            )}
          />
          <Input size="full" placeholder="설명" onChange={(e) => setDescription(e.target.value)} />
          <label>가격</label>
          <Input
            size="full"
            type="number"
            placeholder="가격"
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          <label>주소</label>
          <Input
            size="full"
            placeholder="주소를 입력해주세요"
            onChange={(e) => setAddress(e.target.value)}
          />
          <label>예약 가능한 시간대</label>
          <ReservationTimePicker
            selectedDay={selectedDay}
            startTime={startTime}
            endTime={endTime}
            timeSlots={timeSlots}
            isCalendarOpen={isCalendarOpen}
            handleFormatDayClick={handleFormatDayClick}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            handleAddTimeSlot={handleAddTimeSlot}
            handleDeleteTimeSlot={handleDeleteTimeSlot}
            handleCalendarOpen={handleCalendarOpen}
          />
          <label>배너 이미지</label>
          <ImageUploader
            title="banner"
            images={bannerImage}
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
          />
          <label>소개 이미지</label>
          <ImageUploader
            title="intro"
            images={uploadedImages}
            handleUploadImage={handleUploadImage}
            handleDeleteImage={handleDeleteImage}
          />
        </div>
      </form>
      <AlertModal text="체험등록이 완료되었습니다." />
    </>
  );
}

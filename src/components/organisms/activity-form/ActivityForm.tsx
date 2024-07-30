import { Controller, useFormContext } from 'react-hook-form';
import Input from '@/components/atoms/input/Input';
import Select from '@/components/molecules/select/Select';
import ReservationTimePicker from '../../molecules/reservation-time-picker/ReservationTimePicker';
import ImageUploader from '@/components/organisms/image-uploader/ImageUploader';
import useTimeSlot from '@/models/activity/use-time-slot';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import { useEffect } from 'react';
import { DetailActivityData } from '@/types/activity';
import { ReactNode } from 'react';

interface Props {
  stateData?: DetailActivityData;
}

const options = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
const containerClass = 'flex flex-col gap-[.75rem] md:gap-[1rem] lg:gap-[1.5rem]';
const inputTitleClass = 'text-var-black text-1.25remr font-bold leading-[1.625rem] md:text-1.5remr';

export default function ActivityForm({ stateData }: Props) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const {
    selectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    schedules,
    setSchedules,
    addSchedules,
    deletedSchedule,
    setScheduleIds,
    isCalendarOpen,
    handleCalendarOpen,
    handleFormatDayClick,
    handleAddSchedules,
    handleDeleteSchedules,
    handleStartTimeChange,
    handleEndTimeChange,
  } = useTimeSlot();
  const {
    uploadedImages,
    setUploadedImages,
    bannerImage,
    subImages,
    setSubImages,
    deletedImages,
    setBannerImage,
    addImages,
    handleUploadImage,
    handleDeleteImage,
  } = useImageUploader();

  setValue('schedules', schedules);
  setValue('bannerImageUrl', bannerImage);
  setValue('subImageUrls', uploadedImages);
  setValue('subImageUrlsToAdd', addImages);
  setValue('subImageIdsToRemove', deletedImages);
  setValue('scheduleIdsToRemove', deletedSchedule);
  setValue('schedulesToAdd', addSchedules);

  /* 서버에서 받아온 데이터 state에 저장 */
  useEffect(() => {
    const timeIds = stateData?.schedules.map((time) => time.id);
    const ids = stateData?.subImages.map((image) => image.id);
    const imgs = stateData?.subImages.map((image) => image.imageUrl);

    if (timeIds) {
      setBannerImage(stateData?.bannerImageUrl || '');
      setSchedules(stateData?.schedules || []);
      setScheduleIds(timeIds);
    }

    if (ids?.length && imgs?.length) {
      const imagesWithIds = imgs.map((url, index) => ({
        url,
        id: ids[index],
      }));
      setUploadedImages(imgs);
      setSubImages(imagesWithIds);
    }
  }, [stateData, setSchedules, setScheduleIds, setBannerImage, setUploadedImages, setSubImages]);

  const getErrorMessage = (error: any): ReactNode => {
    return error ? <span className="text-red-500">{error.message}</span> : null;
  };

  return (
    <>
      <Input
        size="full"
        placeholder="제목"
        {...register('title', {
          maxLength: {
            value: 20,
            message: '제목은 최대 20자까지 입력할 수 있습니다.',
          },
        })}
      />
      {getErrorMessage(errors.title)}
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            options={options}
            placeholder="카테고리"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <textarea
        {...register('description')}
        placeholder="설명"
        className="h-200pxr rounded-md border border-var-gray2 px-20pxr py-16pxr"
      />
      <div className={containerClass}>
        <label className={inputTitleClass}>가격</label>
        <Input
          size="full"
          type="number"
          placeholder="가격"
          {...register('price', {
            setValueAs: (value) => parseFloat(value),
            min: {
              value: 0,
              message: '가격은 0보다 커야 합니다.',
            },
            max: {
              value: 999999999,
              message: '가격은 999,999,999보다 작아야 합니다.',
            },
          })}
        />
        {getErrorMessage(errors.price)}
      </div>
      <div className={containerClass}>
        {/* 주소찾기 api 추가 예정 */}
        <label className={inputTitleClass}>주소</label>
        <Input size="full" placeholder="주소를 입력해주세요" {...register('address')} />
      </div>
      <div className={containerClass}>
        <label className={inputTitleClass}>예약 가능한 시간대</label>
        <ReservationTimePicker
          selectedDay={selectedDay}
          startTime={startTime}
          endTime={endTime}
          timeSlots={schedules}
          isCalendarOpen={isCalendarOpen}
          handleFormatDayClick={handleFormatDayClick}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          handleAddTimeSlot={handleAddSchedules}
          handleDeleteTimeSlot={handleDeleteSchedules}
          handleCalendarOpen={handleCalendarOpen}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
        />
      </div>
      <div className={containerClass}>
        <label className={inputTitleClass}>배너 이미지</label>
        <ImageUploader
          title="banner"
          images={bannerImage}
          handleUploadImage={handleUploadImage}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
      <div className={containerClass}>
        <label className={inputTitleClass}>소개 이미지</label>
        <ImageUploader
          title="intro"
          images={uploadedImages}
          handleUploadImage={handleUploadImage}
          handleDeleteImage={handleDeleteImage}
        />
      </div>
      <p className="text-18pxr font-normal text-var-gray1">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>
    </>
  );
}

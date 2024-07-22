import { Controller, useFormContext } from 'react-hook-form';
import Input from '@/components/atoms/input/Input';
import Select from '@/components/molecules/select/Select';
import ReservationTimePicker from '../../molecules/reservation-time-picker/ReservationTimePicker';
import ImageUploader from '@/components/organisms/image-uploader/ImageUploader';
import useTimeSlot from '@/models/activity/use-time-slot';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import { useEffect } from 'react';
import { DetailActivityData } from '@/types/activity';

interface Props {
  stateData?: DetailActivityData;
}

export default function ActivityForm({ stateData }: Props) {
  const { register, control, setValue } = useFormContext();
  const {
    selectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    schedules,
    setSchedules,
    addschedules,
    deletedSchedule,
    setScheduleIds,
    isCalendarOpen,
    handleCalendarOpen,
    handleFormatDayClick,
    handleAddSchedules,
    handleDeleteSchedules,
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
  const options = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];
  const containerClass = 'flex flex-col gap-[12px] md:gap-[16px] lg:gap-[24px]';
  const inputTitleClass = 'text-var-black text-20pxr font-bold leading-[26px] md:text-24pxr';

  setValue('schedules', schedules);
  setValue('bannerImageUrl', bannerImage);
  setValue('subImageUrls', uploadedImages);
  setValue('subImageUrlsToAdd', addImages);
  setValue('subImageIdsToRemove', deletedImages);
  setValue('scheduleIdsToRemove', deletedSchedule);
  setValue('schedulesToAdd', addschedules);

  /* 서버에서 받아온 데이터 state에 저장 */
  useEffect(() => {
    const ids = stateData?.subImages.map((image) => image.id);
    const imgs = stateData?.subImages.map((image) => image.imageUrl);
    const timeIds = stateData?.schedules.map((time) => time.id);

    if (ids?.length && timeIds?.length && imgs?.length) {
      const imagesWithIds = imgs.map((url, index) => ({
        url,
        id: ids[index],
      }));

      setSchedules(stateData?.schedules || []);
      setScheduleIds(timeIds);
      setBannerImage(stateData?.bannerImageUrl || '');
      setUploadedImages(imgs);
      setSubImages(imagesWithIds);
    }
  }, [stateData, setSchedules, setScheduleIds, setBannerImage, setUploadedImages, setSubImages]);

  console.log(schedules);

  return (
    <>
      <Input size="full" placeholder="제목" {...register('title')} />
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
      <Input size="full" placeholder="설명" {...register('description')} />
      <div className={containerClass}>
        <label className={inputTitleClass}>가격</label>
        <Input
          size="full"
          type="number"
          placeholder="가격"
          {...register('price', {
            setValueAs: (value) => parseFloat(value),
          })}
        />
      </div>
      <div className={containerClass}>
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
    </>
  );
}

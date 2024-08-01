import { ActivityEditData, ActivitySettingData } from '@/types/activity';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

/** 폼 제출 시 유효성검사 */
export const validateFormValues = (formValues: any) => {
  if (!formValues.bannerImageUrl) {
    return '배너 이미지를 등록해주세요.';
  }

  if (!formValues.schedules || formValues.schedules.length === 0) {
    return '스케줄을 등록해주세요.';
  }
};

/** 체험등록 폼 body 생성 */
export const registerActivityForm = (methods: UseFormReturn<ActivitySettingData>) => {
  const formValues = methods.getValues();

  /* 폼 제출 에러 메시지 */
  const validationError = validateFormValues(formValues);

  if (validationError) {
    toast(validationError);
    return;
  }

  return {
    title: formValues.title,
    category: formValues.category,
    description: formValues.description,
    price: formValues.price,
    address: formValues.address,
    schedules: methods.getValues('schedules'),
    bannerImageUrl: methods.getValues('bannerImageUrl'),
    subImageUrls: methods.getValues('subImageUrls'),
  };
};

/** 체험수정 폼 body 생성 */
export const editActivityForm = (methods: UseFormReturn<ActivityEditData>) => {
  const formValues = methods.getValues();

  /* 폼 제출 에러 메시지 */
  const validationError = validateFormValues(formValues);

  if (validationError) {
    toast(validationError);
    return;
  }

  return {
    title: formValues.title,
    category: formValues.category,
    description: formValues.description,
    price: formValues.price,
    address: formValues.address,
    bannerImageUrl: formValues.bannerImageUrl,
    subImageUrlsToAdd: formValues.subImageUrlsToAdd,
    subImageIdsToRemove: formValues.subImageIdsToRemove,
    scheduleIdsToRemove: formValues.scheduleIdsToRemove,
    schedulesToAdd: formValues.schedulesToAdd,
  };
};

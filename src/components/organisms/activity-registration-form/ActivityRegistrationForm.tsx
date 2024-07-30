'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation } from '@tanstack/react-query';
import { submitMutationOptions } from '@/mutations/activity/submit-activity';
import { ActivitySettingData } from '@/types/activity';
import { useRouter } from 'next/navigation';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import { toast } from 'react-toastify';

export default function ActivityRegistrationForm() {
  const methods = useForm<ActivitySettingData>({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      address: '',
      price: 0,
      schedules: [],
      bannerImageUrl: '',
      subImageUrls: [],
    },
  });
  const router = useRouter();

  const mutation = useMutation({
    ...submitMutationOptions,
    onSuccess: () => {
      toast('체험등록이 완료되었습니다.');
      router.push('/myactivity');
    },
  });

  const submit = () => {
    const formValues = methods.getValues();

    if (!formValues.bannerImageUrl) {
      toast('배너 이미지를 등록해주세요.');
      return;
    }

    if (!formValues.schedules || formValues.schedules.length === 0) {
      toast('스케줄을 등록해주세요.');
      return;
    }

    const body: ActivitySettingData = {
      title: formValues.title,
      category: formValues.category,
      description: formValues.description,
      price: formValues.price,
      address: formValues.address,
      schedules: methods.getValues('schedules'),
      bannerImageUrl: methods.getValues('bannerImageUrl'),
      subImageUrls: methods.getValues('subImageUrls'),
    };
    mutation.mutate(body);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <div className="flex flex-col gap-24pxr">
          <div className="flex items-center justify-between">
            <h1 className="text-32pxr font-bold">내 체험 등록</h1>
            <Button text="등록하기" color="black" size="s" type="submit" />
          </div>
          <ActivityForm />
        </div>
      </form>
    </FormProvider>
  );
}

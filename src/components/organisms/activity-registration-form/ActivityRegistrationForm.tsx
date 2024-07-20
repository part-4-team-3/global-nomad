'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation } from '@tanstack/react-query';
import { submitMutationOptions } from '@/mutations/activity/submit-activity';
import { ActivitySettingData } from '@/types/activity';
import { useModal } from '@/store/useModal';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import { useRouter } from 'next/navigation';
import AlertModal from '@/components/molecules/modal/AlertModal';

export default function ActivityRegistrationForm() {
  const router = useRouter();
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
  const { setIsOpen } = useModal();

  const openModal = (modalKey: string) => {
    setIsOpen(modalKey);
  };

  const mutation = useMutation({
    ...submitMutationOptions,
    onSuccess: () => {
      openModal('alertMessage');
      router.push('/myactivity');
    },
  });

  const submit = (data: ActivitySettingData) => {
    mutation.mutate({
      ...data,
      schedules: methods.getValues('schedules'),
      bannerImageUrl: methods.getValues('bannerImageUrl'),
      subImageUrls: methods.getValues('subImageUrls'),
    });
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
      <AlertModal text="체험등록이 완료되었습니다." />
    </FormProvider>
  );
}

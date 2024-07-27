'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation } from '@tanstack/react-query';
import { patchMutationOptions } from '@/mutations/activity/submit-activity';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DetailActivityData } from '@/types/activity';
import { toast } from 'react-toastify';

interface Props {
  stateData: DetailActivityData;
}

export default function ActivityEditForm({ stateData }: Props) {
  const params = useParams();
  const router = useRouter();
  const activityId = Number(params.id);
  const methods = useForm();

  useEffect(() => {
    if (stateData) {
      methods.reset(stateData);
    }
  }, [stateData, methods]);

  const mutation = useMutation({
    ...patchMutationOptions,
    onSuccess: () => {
      toast('체험수정이 완료되었습니다.');
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

    const body = {
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
    mutation.mutate({ activityId, body });
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>
          <div className="flex flex-col gap-24pxr">
            <div className="flex items-center justify-between">
              <h1 className="text-32pxr font-bold">내 체험 수정</h1>
              <Button text="수정하기" color="black" size="s" type="submit" />
            </div>
            <ActivityForm stateData={stateData} />
          </div>
        </form>
      </FormProvider>
    </>
  );
}

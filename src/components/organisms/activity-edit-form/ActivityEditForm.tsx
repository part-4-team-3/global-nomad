'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { patchMutationOptions, submitMutationOptions } from '@/mutations/activity/submit-activity';
import { ActivityEditData } from '@/types/activity';
import { useModal } from '@/store/useModal';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import AlertModal from '@/components/molecules/modal/AlertModal';
import { useParams, useRouter } from 'next/navigation';
import { getActivityDetails } from '@/queries/activities/get-activity-details';
import { act, useEffect, useState } from 'react';

export default function ActivityEditForm() {
  const router = useRouter();
  const params = useParams();
  const activityId = Number(params.id);
  const [stateData, setStateData] = useState<any>();
  const methods = useForm();
  const { setIsOpen } = useModal();

  const openModal = (modalKey: string) => {
    setIsOpen(modalKey);
  };

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const data = await getActivityDetails(activityId);
        methods.reset(data);
        setStateData(data);
      } catch (err) {
        alert('요청에 실패했습니다.');
      }
    };
    if (activityId) {
      fetchActivityDetails();
    }
  }, []);

  const mutation = useMutation({
    ...patchMutationOptions,
    onSuccess: () => {
      openModal('alertMessage');
      router.push('/myactivity');
    },
  });

  const submit = () => {
    const formValues = methods.getValues();
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
      schedulesToAdd: formValues.schedules,
    };
    console.log(activityId);
    mutation.mutate({ activityId, body });
  };

  return (
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
      <AlertModal text="체험수정이 완료되었습니다." />
    </FormProvider>
  );
}

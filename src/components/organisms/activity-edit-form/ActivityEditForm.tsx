'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchMutationOptions } from '@/mutations/activity/submit-activity';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ActivityEditData, DetailActivityData } from '@/types/activity';
import { toast } from 'react-toastify';
import { editActivityForm } from '@/models/activity/form-utils';
import { revalidate } from '@/lib/revalidate';

interface Props {
  initActivity: DetailActivityData;
}

export default function ActivityEditForm({ initActivity }: Props) {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const activityId = Number(params.id);
  const methods = useForm<ActivityEditData>();

  useEffect(() => {
    if (initActivity) {
      methods.reset(initActivity);
    }
  }, [initActivity, methods]);

  const mutation = useMutation({
    ...patchMutationOptions,
    onSuccess: async () => {
      toast('체험수정이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['my-activities'],
        exact: true,
      });
      await revalidate('/');
      router.back();
    },
  });

  const submit = () => {
    const body = editActivityForm(methods);
    if (body) {
      mutation.mutate({ activityId, body });
    }
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
            <ActivityForm initActivity={initActivity} />
          </div>
        </form>
      </FormProvider>
    </>
  );
}

'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Button from '@/components/atoms/button/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitMutationOptions } from '@/mutations/activity/submit-activity';
import { ActivitySettingData } from '@/types/activity';
import { useRouter } from 'next/navigation';
import ActivityForm from '@/components/organisms/activity-form/ActivityForm';
import { toast } from 'react-toastify';
import { registerActivityForm } from '@/models/activity/form-utils';
import { revalidate } from '@/lib/revalidate';
import { useState } from 'react';
import axios from 'axios';

export default function ActivityRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
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
    onSuccess: async () => {
      toast('체험등록이 완료되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['my-activities'],
        exact: true,
      });
      await revalidate('/');
      router.back();
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.data.message;
        toast(errorMessage);
      }
      setIsSubmitting(false);
    },
  });

  const submit = () => {
    setIsSubmitting(true);
    const body = registerActivityForm(methods);
    if (body) {
      mutation.mutate(body);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <div className="flex flex-col gap-24pxr">
          <div className="flex items-center justify-between">
            <h1 className="text-32pxr font-bold">내 체험 등록</h1>
            <Button text="등록하기" color="black" size="s" type="submit" disabled={isSubmitting} />
          </div>
          <ActivityForm />
        </div>
      </form>
    </FormProvider>
  );
}

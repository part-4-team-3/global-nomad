'use client';

import Button from '@/components/atoms/button/Button';
import Modal from './Modal';
import { useModal } from '@/store/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteActivityMutationOptions } from './../../../mutations/my-activities/delete';
import afterDelete from '@/models/my-activities/update-cache';
import { toast } from 'react-toastify';

interface Props {
  activityId: number;
}

export default function ActivityDeleteModal({ activityId }: Props) {
  const { setIsClose } = useModal();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...deleteActivityMutationOptions,
    onSuccess: () => {
      afterDelete(queryClient, activityId);
      toast('체험 삭제되었습니다.');
    },
  });

  const handelDelete = () => {
    mutation.mutate({ activityId });
    setIsClose();
  };

  return (
    <Modal
      modalKey={`activityDeleteModal-${activityId}`}
      className="!rounded-none md:!rounded-[8px]"
    >
      <div className="flex h-200pxr w-400pxr max-w-[90vw] flex-col items-center justify-center gap-[30px]">
        <p className="text-20pxr">삭제하시겠습니까?</p>
        <div className="flex gap-[20px]">
          <Button className="w-150pxr py-[10px]" text="예" color="black" onClick={handelDelete} />
          <Button className="w-150pxr py-[10px]" text="아니요" color="white" onClick={setIsClose} />
        </div>
      </div>
    </Modal>
  );
}

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
      <div className="flex h-120pxr w-300pxr flex-col items-center justify-center gap-20pxr">
        <p className="text-20pxr">삭제하시겠습니까?</p>
        <div className="flex gap-6pxr">
          <Button className="w-80pxr" text="예" color="black" onClick={handelDelete} />
          <Button className="w-80pxr" text="아니요" color="black" onClick={setIsClose} />
        </div>
      </div>
    </Modal>
  );
}

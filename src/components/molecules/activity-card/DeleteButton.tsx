import { useModal } from '@/store/useModal';
import Image from 'next/image';
import ActivityDeleteModal from '../modal/ActivityDeleteModal';
import { SyntheticEvent } from 'react';

interface Props {
  activityId: number;
}

export default function DeleteButton({ activityId }: Props) {
  const { setIsOpen } = useModal();

  return (
    <>
      <button
        onClick={(e: SyntheticEvent) => {
          e.stopPropagation();
          setIsOpen(`activityDeleteModal-${activityId}`);
        }}
      >
        <Image src="/delete.svg" width={25} height={25} alt="activity delete button" />
      </button>
      <ActivityDeleteModal activityId={activityId} />
    </>
  );
}

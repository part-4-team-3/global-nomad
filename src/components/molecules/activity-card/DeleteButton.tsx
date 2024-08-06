import { useModal } from '@/store/useModal';
import Image from 'next/image';
import ActivityDeleteModal from '../modal/ActivityDeleteModal';

interface Props {
  activityId: number;
}

export default function DeleteButton({ activityId }: Props) {
  const { setIsOpen } = useModal();

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(`activityDeleteModal-${activityId}`);
        }}
      >
        <Image src="/trashcan.svg" width={40} height={40} alt="activity delete button" />
      </button>
      <ActivityDeleteModal activityId={activityId} />
    </>
  );
}

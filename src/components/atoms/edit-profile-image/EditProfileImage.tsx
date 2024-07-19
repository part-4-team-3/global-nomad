import { useModal } from '@/store/useModal';
import Image from 'next/image';
import EditProfileModal from '@/components/molecules/modal/EditProfileModal';

export default function EditProfileImage() {
  const { setIsOpen } = useModal();

  const openModal = (modalKey: string) => {
    setIsOpen(modalKey);
  };

  return (
    <>
      <button
        className="absolute bottom-[24px] right-[12px] size-[44px]"
        onClick={() => openModal('editProfileImage')}
      >
        <Image fill src="/profile-image-setting-icon.svg" alt="프로필 사진 수정하기" />
      </button>
      <EditProfileModal />
    </>
  );
}

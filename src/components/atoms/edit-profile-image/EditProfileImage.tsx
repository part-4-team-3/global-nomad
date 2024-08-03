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
        className="absolute bottom-[0px] right-[0] size-30pxr md:right-[12px] md:size-44pxr"
        onClick={() => openModal('editProfileImage')}
      >
        <Image fill src="/profile-image-setting-icon.svg" alt="프로필 사진 수정하기" />
      </button>
      <EditProfileModal />
    </>
  );
}

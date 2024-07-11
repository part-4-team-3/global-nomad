import Image from 'next/image';
import Modal from './Modal';
import Button from '@/components/atoms/button/Button';
import { useModal } from '@/store/useModal';
import { useImageUploader } from '@/models/uploader/use-image-uploader';

export default function EditProfileModal() {
  const { profileImage, handleEditProfileImage, submitProfileImage } = useImageUploader();
  const { setIsClose } = useModal();

  const closeModal = () => {
    setIsClose();
  };

  return (
    <Modal modalKey="editProfileImage">
      <div className="relative flex flex-col items-center justify-center gap-[48px] px-[50px] py-[24px] pb-[72px]">
        <label className="flex flex-col gap-[24px] font-bold text-[48pxr]">
          프로필 이미지 변경하기
          {/* 임시이미지입니다. */}
          <div className="relative size-[160px] overflow-hidden rounded-full">
            <Image fill src={profileImage} alt="프로필 사진" />
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            id="imageUpload"
            onChange={handleEditProfileImage}
          />
        </label>
        <div className="absolute bottom-[12px] right-[12px] flex gap-[12px]">
          <Button size="s" color="white" text="취소" onClick={closeModal} />
          <Button size="s" color="black" text="확인" onClick={submitProfileImage} />
        </div>
      </div>
    </Modal>
  );
}

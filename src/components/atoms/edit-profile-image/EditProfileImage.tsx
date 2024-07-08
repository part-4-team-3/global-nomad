import Modal from '@/components/molecules/modal/Modal';
import { useModal } from '@/store/useModal';
import Image from 'next/image';
import Button from '../button/Button';
import { useImageUploader } from '@/models/uploader/useImageUploader';

export default function EditProfileImage() {
  const { uploadedImages, handleUploadImage } = useImageUploader();
  const { setIsOpen, setIsClose } = useModal();

  const openModal = (modalKey: string) => {
    setIsOpen(modalKey);
  };

  const closeModal = () => {
    setIsClose();
  };

  return (
    <>
      <button
        className="absolute bottom-[0px] right-[12px] size-[44px]"
        onClick={() => openModal('editProfileImage')}
      >
        <Image fill src="/profile-image-setting-icon.svg" alt="프로필 사진 수정하기" />
      </button>
      <Modal modalKey="editProfileImage">
        <div className="relative flex flex-col items-center justify-center gap-[48px] px-[50px] py-[24px] pb-[72px]">
          <label className="flex flex-col gap-[32px] font-bold text-[48pxr]">
            프로필 이미지 변경하기
            {/* 임시이미지입니다. */}
            <div className="relative size-[160px] overflow-hidden rounded-full">
              <Image fill src={uploadedImages[0]} alt="프로필 사진" />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              id="imageUpload"
              onChange={handleUploadImage}
            />
          </label>
          <div className="absolute bottom-[12px] right-[12px] flex gap-[12px]">
            <Button size="s" color="white" text="취소" onClick={closeModal} />
            {/* api 연결 예정*/}
            <Button size="s" color="black" text="확인" />
          </div>
        </div>
      </Modal>
    </>
  );
}

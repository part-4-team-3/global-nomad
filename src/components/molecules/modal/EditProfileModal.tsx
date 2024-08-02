import Image from 'next/image';
import Modal from './Modal';
import Button from '@/components/atoms/button/Button';
import { useModal } from '@/store/useModal';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import useUser from '@/store/useUser';

export default function EditProfileModal() {
  const { profileImage, handleEditProfileImage, submitProfileImage } = useImageUploader();
  const { setIsClose } = useModal();
  const { user } = useUser();

  const closeModal = () => {
    setIsClose();
  };

  return (
    <Modal modalKey="editProfileImage">
      <div className="relative flex flex-col items-center justify-center gap-[48px] px-[50px] py-[24px] pb-[72px]">
        <label className="flex flex-col gap-[24px] text-48pxr font-bold">
          프로필 이미지 변경하기
          <div className="relative size-160pxr overflow-hidden rounded-full">
            {profileImage ? (
              <Image fill src={profileImage} alt="프로필 사진" />
            ) : (
              <div className="flex size-160pxr items-center justify-center rounded-[50%] bg-var-gray1 text-80pxr text-white">
                {user && user.nickname.slice(0, 1)}
              </div>
            )}
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

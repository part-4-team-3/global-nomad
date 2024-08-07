import Image from 'next/image';
import { useImageUploader } from '@/models/uploader/use-image-uploader';
import useUser from '@/store/useUser';
import { useEffect, useRef } from 'react';

interface Props {
  onProfileImageChange: (imageUrl: string) => void;
}

export default function EditProfileImage({ onProfileImageChange }: Props) {
  const { profileImage, handleEditProfileImage } = useImageUploader();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    onProfileImageChange(profileImage || user?.profileImageUrl || '');
  }, [profileImage, user?.profileImageUrl, onProfileImageChange]);

  return (
    <div className="relative flex flex-col gap-[16px]">
      <label className="text-24pxr font-bold">프로필 이미지</label>
      <div className="relative w-160pxr">
        <div className="relative size-160pxr overflow-hidden rounded-full shadow-lg">
          {profileImage ? (
            <Image fill src={profileImage} alt="프로필 사진" className="object-cover" />
          ) : (
            <div className="flex size-160pxr items-center justify-center rounded-[50%] bg-var-gray1 text-80pxr text-white">
              {user && user.nickname.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="pl-[36px]">
          <button
            className="absolute bottom-[0px] right-[12px] size-44pxr"
            type="button"
            color="black"
            onClick={handleButtonClick}
          >
            <Image fill src="/profile-image-setting-icon.svg" alt="프로필 사진 수정하기" />
          </button>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            id="imageUpload"
            ref={fileInputRef}
            onChange={handleEditProfileImage}
          />
        </div>
      </div>
    </div>
  );
}

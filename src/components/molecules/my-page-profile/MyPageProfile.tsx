import EditProfileImage from '@/components/atoms/edit-profile-image/EditProfileImage';
import Image from 'next/image';

export default function MyPageProfile() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative size-[160px] rounded-full">
        {/* 임시이미지입니다. */}
        <Image fill src="/close-button-icon.svg" alt="프로필 사진" />
        <EditProfileImage />
      </div>
    </div>
  );
}

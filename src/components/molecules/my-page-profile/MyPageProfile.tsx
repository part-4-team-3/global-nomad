import Image from 'next/image';

export default function MyPageProfile() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative size-[160px] rounded-full">
        {/* 임시이미지 입니다. */}
        <Image fill src="/close-button-icon.svg" alt="프로필 사진" />
        <button className="absolute bottom-[0px] right-[12px] size-[44px]">
          <Image fill src="/profile-image-setting-icon.svg" alt="프로필 사진 수정하기" />
        </button>
      </div>
    </div>
  );
}

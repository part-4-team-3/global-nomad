import Image from 'next/image';

interface Props {
  nickname: string;
  imageUrl: string | null;
  className?: string;
}

export default function ProfileImage({ nickname, imageUrl, className = '' }: Props) {
  if (!imageUrl)
    return (
      <div
        className={`flex size-32pxr items-center justify-center rounded-[50%] bg-var-gray1 text-white ${className}`}
      >
        {nickname.slice(0, 1)}
      </div>
    );
  return (
    <Image
      className={`size-32pxr overflow-hidden rounded-[50%] object-cover shadow-lg ${className}`}
      src={imageUrl}
      width={45}
      height={45}
      alt="프로필 이미지"
    />
  );
}

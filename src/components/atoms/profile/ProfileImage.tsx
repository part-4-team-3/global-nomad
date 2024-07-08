import Image from 'next/image';

interface Props {
  nickname: string;
  imageUrl: string | null;
}

export default function ProfileImage({ nickname, imageUrl }: Props) {
  if (!imageUrl)
    return (
      <div className="flex size-32pxr items-center justify-center rounded-[50%] bg-var-gray1 text-white">
        {nickname.slice(0, 1)}
      </div>
    );
  return (
    <Image
      className="size-32pxr overflow-hidden rounded-[50%] object-cover"
      src={imageUrl}
      width={32}
      height={32}
      alt="프로필 이미지"
    />
  );
}

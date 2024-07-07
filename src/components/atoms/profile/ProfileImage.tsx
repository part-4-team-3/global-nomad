import Image from 'next/image';

interface Props {
  src: string;
}

export default function ProfileImage({ src }: Props) {
  return (
    <Image
      className="size-32pxr overflow-hidden rounded-[50%] object-cover"
      src={src}
      width={32}
      height={32}
      alt="프로필 이미지"
    />
  );
}

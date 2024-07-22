import Image from 'next/image';
import { useState } from 'react';

interface Props {
  variant: 'card' | 'modal';
  src: string;
}

const SIZE = {
  card: 'w-full max-w-128pxr md:max-w-156pxr lg:max-w-204pxr',
  modal: 'w-full max-w-100pxr md:max-w-126pxr',
};

export default function CardImage({ variant, src }: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div
      className={`relative ${SIZE[variant]} overflow-hidden ${variant === 'card' ? 'rounded-l-[24px]' : 'rounded-[24px]'}`}
    >
      <Image
        src={isError ? '/no-image.jpg' : src}
        layout="fill"
        objectFit="cover"
        alt=""
        onError={() => setIsError(true)}
      />
    </div>
  );
}

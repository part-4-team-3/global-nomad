import Image from 'next/image';
import { useState } from 'react';

interface Props {
  variant: 'card' | 'modal';
  src: string;
}

const SIZE = {
  card: 'w-128pxr md:w-156pxr lg:w-204pxr',
  modal: 'w-100pxr md:w-126pxr',
};

export default function CardImage({ variant, src }: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div className={`relative ${SIZE[variant]} overflow-hidden rounded-l-[24px]`}>
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

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  src: string;
}

export default function ReservationImage({ src }: Props) {
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative size-128pxr md:size-156pxr lg:size-204pxr">
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

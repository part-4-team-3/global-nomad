import Image from 'next/image';
import React from 'react';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: Props) {
  const [hover, setHover] = React.useState(0);

  return (
    <div className="flex gap-8pxr">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className="p-0 m-0 cursor-pointer border-none bg-transparent focus:outline-none"
            onClick={() => onChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(0)}
          >
            <Image
              src={index <= (hover || value) ? '/full-star.svg' : '/empty-star.svg'}
              width={54}
              height={50}
              alt=""
            />
          </button>
        );
      })}
    </div>
  );
}

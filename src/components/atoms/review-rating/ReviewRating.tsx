import Image from 'next/image';

interface Props {
  rating: number;
  reviewCount: number;
  color?: 'white' | 'gray';
}

export default function ReviewRating({ rating, reviewCount, color }: Props) {
  const imageSrc = !color ? '/star-icon.svg' : '/star-bold.svg';
  return (
    <div className="flex items-center gap-5pxr">
      <Image src={imageSrc} width={18} height={18} alt="별" />
      <span
        className={`text-14pxr md:text-16pxr ${color === 'white' ? 'text-14pxr font-[600] text-white' : color === 'gray' ? 'font-[500]' : 'font-[400]'}`}
      >
        {rating ? rating : 0}{' '}
        <span className={color === 'gray' ? 'text-var-gray9' : ''}>
          ({reviewCount ? reviewCount : 0})
        </span>
      </span>
    </div>
  );
}

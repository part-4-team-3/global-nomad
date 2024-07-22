import Image from 'next/image';

interface Props {
  rating: number;
  reviewCount: number;
  color: 'white' | 'gray' | 'black';
  className?: string;
}

const SCORE = {
  white: 'text-white font-[600]',
  gray: 'font-[500]',
  black: 'font-[500]',
};

const COUNT = {
  white: '',
  gray: 'text-var-gray9',
  black: '',
};

export default function ReviewRating({ rating, reviewCount, color, className }: Props) {
  const imageSrc = !color ? '/star-icon.svg' : '/star-bold.svg';
  return (
    <div className={`flex items-center gap-[5px] ${className}`}>
      <Image src={imageSrc} width={18} height={18} alt="별" />
      <span className={`text-14pxr md:text-16pxr ${SCORE[color]}`}>
        {rating ? rating : 0}{' '}
        <span className={COUNT[color]}>({reviewCount ? reviewCount : 0})</span>
      </span>
    </div>
  );
}

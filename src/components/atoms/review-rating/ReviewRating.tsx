import Image from 'next/image';

interface Props {
  color?: 'white' | 'gray';
}

export default function ReviewRating({ color }: Props) {
  const imageSrc = !color ? '/star-icon.svg' : '/star-bold.svg';
  return (
    <div className="flex items-center gap-5pxr">
      <Image src={imageSrc} width={18} height={18} alt="별" />
      <span
        className={`text-14pxr sm:text-16pxr ${color === 'white' ? 'text-14pxr font-[600] text-white' : color === 'gray' ? 'font-[500]' : 'font-[400]'}`}
      >
        4.9 <span className={color === 'gray' ? 'text-var-gray9' : ''}>(444)</span>
      </span>
    </div>
  );
}

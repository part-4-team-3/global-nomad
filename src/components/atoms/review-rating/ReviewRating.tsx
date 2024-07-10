import Image from 'next/image';

export default function ReviewRating() {
  return (
    <div>
      <Image src="/star-bold.svg" width={18} height={18} alt="별" />
      <span>4.9 (444)</span>
    </div>
  );
}

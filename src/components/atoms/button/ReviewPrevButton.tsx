import Link from 'next/link';
import Image from 'next/image';

interface Props {
  href: string;
  currentPage: number;
}

export default function ReviewPrevButton({ href, currentPage }: Props) {
  return (
    <Link href={href} className="h-40pxr">
      <button className="max-md:size-[40px] relative size-40pxr" disabled={currentPage === 1}>
        <Image
          fill
          src={currentPage === 1 ? '/pagination-left-invalid.svg' : '/pagination-left.svg'}
          alt="이전 페이지"
        />
      </button>
    </Link>
  );
}

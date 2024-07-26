import Link from 'next/link';
import Image from 'next/image';

interface Props {
  href: string;
  currentPage: number;
  totalPage: number;
}

export default function ReviewNextButton({ currentPage, href, totalPage }: Props) {
  return (
    <Link href={href} className="h-40pxr">
      <button
        className="max-md:size-[40px] relative size-40pxr"
        disabled={currentPage === totalPage}
      >
        <Image
          fill
          src={
            currentPage === totalPage ? '/pagination-right-invalid.svg' : '/pagination-right.svg'
          }
          alt="이전 페이지"
        />
      </button>
    </Link>
  );
}

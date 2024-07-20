import Link from 'next/link';
import Image from 'next/image';

interface Props {
  href: string;
  currentPage: number;
  totalPage?: number;
  direction: 'prev' | 'next';
}

export default function PageArrowButton({ href, currentPage, totalPage, direction }: Props) {
  const buttonStyle =
    'flex justify-center items-center size-40pxr md:size-55pxr rounded-[15px] border';
  const imageStyle = `size-21pxr no-drag ${direction === 'prev' ? 'scale-x-[-1]' : ''}`;

  if (
    (direction === 'prev' && currentPage === 1) ||
    (direction === 'next' && currentPage === totalPage)
  )
    return (
      <button disabled className={`border-var-gray6 ${buttonStyle}`}>
        <Image
          width={55}
          height={55}
          src="/pagination-invalid.svg"
          alt={direction === 'prev' ? '이전 페이지 없음' : '다음 페이지 없음'}
          className={imageStyle}
        />
      </button>
    );

  return (
    <Link href={href} scroll={false} className={`border-var-green-dark ${buttonStyle}`}>
      <Image
        width={55}
        height={55}
        src="/pagination.svg"
        alt={direction === 'prev' ? '이전 페이지' : '다음 페이지'}
        className={imageStyle}
      />
    </Link>
  );
}

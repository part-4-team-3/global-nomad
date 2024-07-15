import Link from 'next/link';
import Image from 'next/image';
interface args {
  currentPage: number;
  totalPage: number;
}

const RentderPageNumbers = ({ currentPage, totalPage }: args) => {
  let start: number;
  let end: number;

  // 전페 페이지가 5페이지 이하일 때
  if (totalPage <= 5) {
    start = 1;
    end = totalPage;
  } else {
    //시작페이지 렌더링
    if (currentPage <= 3) {
      start = 1;
      end = 5;
    } //마지막페이지 렌더링
    else if (currentPage >= totalPage - 2) {
      start = totalPage - 4;
      end = totalPage;
    } //중간페이지 렌더링
    else {
      start = currentPage - 2;
      end = currentPage + 2;
    }
  }

  const numbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return numbers;
};

interface Props {
  totalPage: number;
  currentPage: number;
  activityId: number;
}

export default function ReviewPagination({ currentPage, activityId, totalPage }: Props) {
  const numbers = RentderPageNumbers({ currentPage: currentPage, totalPage: totalPage });
  return (
    <div className="flex h-fit items-center gap-[10px]">
      <PrevButton
        currentPage={currentPage}
        href={`/activity/${activityId}?page=${currentPage - 1}`}
      />
      <PageNumberButton currentPage={currentPage} numbers={numbers} activityId={activityId} />
      <NextButton
        currentPage={currentPage}
        totalPage={totalPage}
        href={`/activity/${activityId}?page=${currentPage + 1}`}
      />
    </div>
  );
}

interface PrevButtonProp {
  href: string;
  currentPage: number;
}

function PrevButton({ href, currentPage }: PrevButtonProp) {
  return (
    <Link href={href} scroll={false} className="h-[55px]">
      <button className="max-md:size-[40px] relative size-[55px]" disabled={currentPage === 1}>
        <Image
          fill
          src={currentPage === 1 ? '/pagination-left-invalid.svg' : '/pagination-left.svg'}
          alt="이전 페이지"
        />
      </button>
    </Link>
  );
}

interface NextButtonProp {
  href: string;
  currentPage: number;
  totalPage: number;
}

function NextButton({ currentPage, href, totalPage }: NextButtonProp) {
  return (
    <Link href={href} scroll={false} className="h-[55px]">
      <button
        className="max-md:size-[40px] relative size-[55px]"
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

interface NumberProps {
  currentPage: number;
  activityId: number;
  numbers: number[];
}
function PageNumberButton({ currentPage, activityId, numbers }: NumberProps) {
  return numbers.map((number) => (
    <Link href={`/activity/${activityId}?page=${number}`} key={number} scroll={false}>
      <button
        className={`py-17 text-base max-md:size-[40px] size-[55px] items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
      >
        {number}
      </button>
    </Link>
  ));
}

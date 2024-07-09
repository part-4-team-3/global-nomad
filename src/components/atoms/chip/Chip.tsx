interface Props {
  status: 'completed' | 'booked' | 'fixed' | 'remained';
  count: number;
}

export default function Chip({ status, count }: Props) {
  const statusStyle = {
    completed: {
      text: '완료',
      style: 'bg-var-gray6 text-var-gray1',
    },
    booked: {
      text: '예약',
      style: 'bg-var-blue text-white',
    },
    fixed: {
      text: '확정',
      style: 'bg-var-orange text-var-orange-dark',
    },
    remained: {
      text: '잔여',
      style: 'bg-white text-var-blue',
    },
  };
  return (
    <div
      className={`w-full rounded-[4px] px-4pxr py-3pxr text-left text-12pxr md:text-14pxr ${statusStyle[status].style}`}
    >
      {statusStyle[status].text} {count}
    </div>
  );
}

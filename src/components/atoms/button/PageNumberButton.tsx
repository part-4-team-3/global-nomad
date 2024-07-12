interface Props {
  currentPage: number;
  onClick: (index: number) => void;
  numbers: number[];
}
export default function PageNumberButton({ currentPage, onClick, numbers }: Props) {
  return numbers.map((number) => (
    <button
      key={number}
      className={`py-17 text-base max-md:size-[40px] size-[55px] items-center justify-center rounded-2xl border-[1px] border-var-green-dark text-[18pxr] text-var-green-dark ${number === currentPage ? 'bg-var-green-dark text-white' : 'text-gray-600'}`}
      onClick={() => onClick(number)}
    >
      {number}
    </button>
  ));
}

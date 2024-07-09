import Image from 'next/image';

interface Props {
  isSelected: boolean;
  text: string;
  onChange: () => void;
}

export default function Option({ isSelected, text, onChange }: Props) {
  const selected = 'bg-var-green-dark text-white';
  const hover = 'hover:bg-var-green-dark hover:text-white';

  return (
    <li
      className={`relative my-4pxr cursor-pointer rounded-md ${isSelected && selected} ${hover}`}
      onClick={onChange}
    >
      <div className="w-pull flex h-40pxr items-center">
        <Image className="mx-8pxr" src="/check-mark.png" width={20} height={20} alt="" />
        {text}
      </div>
    </li>
  );
}

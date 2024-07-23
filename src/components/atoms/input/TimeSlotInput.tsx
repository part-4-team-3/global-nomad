interface Props {
  type: string;
  value: string;
  readOnly: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string; // 선택적 min 속성
}

export default function TimeSlotInput({
  type,
  value,
  readOnly,
  onChange,
  placeholder,
  min,
}: Props) {
  return (
    <input
      className="h-44pxr w-full rounded-md border border-var-gray2 px-[0px] py-[4px] pr-[0px] text-[9px] md:h-56pxr md:px-[16px] md:py-[8px] md:text-16pxr"
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
    />
  );
}

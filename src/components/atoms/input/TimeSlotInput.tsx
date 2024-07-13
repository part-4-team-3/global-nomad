interface Props {
  type: string;
  value: string;
  readOnly: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TimeSlotInput({ type, value, readOnly, onChange, placeholder }: Props) {
  return (
    <input
      className="h-44pxr w-full rounded-md border border-var-gray2 px-[12px] py-[4px] pr-[0px] text-14pxr md:h-56pxr md:px-[16px] md:py-[8px] md:text-16pxr"
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

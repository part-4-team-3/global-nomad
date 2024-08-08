import Image from 'next/image';
import React, { forwardRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateInput.module.css';

export interface DateInputProps {
  onChange?: (date: Date | null) => void;
  selected?: Date | null;
}

const DateInput = forwardRef<HTMLDivElement, DateInputProps>(({ onChange, selected }, ref) => {
  const datePickerRef = useRef<DatePicker>(null);
  return (
    <div ref={ref} className="relative h-56pxr w-130pxr sm:w-full sm:max-w-[379px]">
      <DatePicker
        ref={datePickerRef}
        selected={selected}
        onChange={onChange}
        dateFormat="yy/MM/dd"
        placeholderText="YY/MM/DD"
        className="h-56pxr w-full cursor-pointer rounded-md border border-var-gray2 px-20pxr py-16pxr"
        wrapperClassName={styles.reactDatepickerWrapper}
      />
      <Image
        className="absolute right-8pxr top-1/2 -translate-y-1/2 transform cursor-pointer"
        src="/calendar.svg"
        alt="Calendar Icon"
        width={32}
        height={32}
        onClick={() => {
          if (datePickerRef.current) datePickerRef.current.setOpen(true);
        }}
      />
    </div>
  );
});

DateInput.displayName = 'DateInput';

export default DateInput;

'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, DateFormatter } from 'react-day-picker';
import { format, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { cn } from '@/lib/tailwind-utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & { scheduled?: Date[] };

function Calendar({
  className,
  classNames,
  scheduled = [],
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const dayFormatter: DateFormatter = (date) => format(date, 'eee', { locale: enUS });

  // Matcher function to check if the date is in the scheduled dates
  const isScheduled = (date: Date) =>
    scheduled.some((scheduledDate) => isSameDay(scheduledDate, date));

  return (
    <div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        formatters={{ formatWeekdayName: dayFormatter }}
        className={cn('px-[20px] py-[10px]', className)}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-[16px] sm:space-x-[16px] sm:space-y-[0px]',
          month: 'space-y-[4px]',
          caption: 'flex justify-center relative items-center',
          caption_label: 'text-14pxr leading-[19px] font-[700]',
          nav: 'space-x-[4px] flex items-center',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-[16px] w-[16px] bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          nav_button_previous: 'absolute left-[4px]',
          nav_button_next: 'absolute right-[4px]',
          table: 'w-full border-collapse space-y-[4px]',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-[32px] font-normal text-[0.8rem]',
          row: 'flex w-full',
          cell: 'h-[32px] w-[32px] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-[32px] w-[32px] p-0 font-normal text-13pxr aria-selected:opacity-100',
          ),
          day_range_end: 'day-range-end',
          day_selected:
            'bg-var-green-dark text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-var-green-dark focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        modifiersClassNames={{
          scheduled: 'bg-var-green2 text-var-green-dark',
        }}
        modifiers={{ scheduled: isScheduled }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-[16px] w-[16px]" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-[16px] w-[16px]" />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };

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
      <p>{JSON.stringify(scheduled)}</p>
      <DayPicker
        showOutsideDays={showOutsideDays}
        formatters={{ formatWeekdayName: dayFormatter }}
        className={cn('p-[12px]', className)}
        classNames={{
          months: 'flex flex-col sm:flex-row space-y-[16px] sm:space-x-[16px] sm:space-y-0',
          month: 'space-y-[16px]',
          caption: 'flex justify-center pt-[4px] relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-[4px] flex items-center',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-[28px] w-[28px] bg-transparent p-0 opacity-50 hover:opacity-100',
          ),
          nav_button_previous: 'absolute left-[4px]',
          nav_button_next: 'absolute right-[4px]',
          table: 'w-full border-collapse space-y-[4px]',
          head_row: 'flex',
          head_cell: 'text-muted-foreground rounded-md w-[36px] font-normal text-[0.8rem]',
          row: 'flex w-full mt-[8px]',
          cell: 'h-[36px] w-[36px] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          day: cn(
            buttonVariants({ variant: 'ghost' }),
            'h-[36px] w-[36px] p-0 font-normal aria-selected:opacity-100',
          ),
          day_range_end: 'day-range-end',
          day_selected:
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
          day_today: 'bg-accent text-accent-foreground',
          day_outside:
            'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
          day_disabled: 'text-muted-foreground opacity-50',
          day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
          day_hidden: 'invisible',
          ...classNames,
        }}
        modifiersClassNames={{
          scheduled: 'bg-var-blue text-white',
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

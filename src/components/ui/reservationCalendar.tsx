'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/tailwind-utils';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import { formatDateYYYYMMDD } from '@/lib/formatDate';
import Chip from '../atoms/chip/Chip';
import { ReservationByMonth } from '@/types/reservation';
import { MyActivitiesOfMonth } from '@/types/activity';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const mockData = [
  {
    date: '2024-07-11',
    reservations: {
      completed: 0,
      confirmed: 2,
      pending: 2,
    },
  },
  {
    date: '2024-07-15',
    reservations: {
      completed: 1,
      confirmed: 0,
      pending: 0,
    },
  },
];

function ReservationCalendar({
  className,
  classNames,
  showOutsideDays = true,
  myActivities,
  ...props
}: CalendarProps & { myActivities?: MyActivitiesOfMonth[] }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full h-full',
        month: 'space-y-4 w-full flex flex-col items-center',
        caption: 'flex justify-center pt-1 relative items-center w-342pxr mb-24pxr',
        caption_label: 'text-var-black font-20pxr font-bold',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1pxr border-none',
        nav_button_next: 'absolute right-1pxr border-none',
        table: 'w-full border-collapse space-y-1 border border-[#E8E8E8] h-full',
        head_row: 'flex text-[#969696] w-full',
        head_cell:
          'text-muted-foreground font-normal text-[0.8rem] w-full border h-full p-12pxr text-left',
        row: 'flex w-full mt-2',
        cell: 'h-154pxr w-full text-sm p-0 text-[#969696] relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 border border-[#E8E8E8]',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-full font-normal aria-selected:opacity-100 w-full flex justify-start items-start p-12pxr',
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
      components={{
        IconLeft: ({ ...props }) => (
          <Image src="/double-arrow-left.svg" alt="" width={24} height={24} />
        ),
        IconRight: ({ ...props }) => (
          <Image src="/double-arrow-right.svg" alt="" width={24} height={24} />
        ),
        Day: ({ date, ...props }) => {
          const onClickDay = () => {
            console.log('Clicked on', formatDateYYYYMMDD(date));
          };

          const isToday = date.toDateString() === new Date().toDateString();
          const day_today = isToday
            ? 'bg-accent text-accent-foreground flex h-full w-full items-start justify-start p-12pxr relative'
            : 'flex h-full w-full items-start justify-start p-12pxr font-normal aria-selected:opacity-100 relative';

          const status = 'absolute bottom-1pxr left-1pxr w-full';

          return (
            <button
              type="button"
              onClick={onClickDay}
              className={cn(buttonVariants({ variant: 'ghost' }), day_today)}
            >
              {date.getDate()}
              {myActivities?.map((item: ReservationByMonth) =>
                item.date === formatDateYYYYMMDD(date) ? (
                  <div key={item.date} className={status}>
                    {item.reservations.pending > 0 && (
                      <Chip status="booked" count={item.reservations.pending} />
                    )}
                    {item.reservations.confirmed > 0 && (
                      <Chip status="fixed" count={item.reservations.confirmed} />
                    )}
                    {item.reservations.completed > 0 && (
                      <Chip status="completed" count={item.reservations.completed} />
                    )}
                  </div>
                ) : null,
              )}
            </button>
          );
        },
      }}
      {...props}
    />
  );
}
ReservationCalendar.displayName = 'ReservationCalendar';

export { ReservationCalendar };

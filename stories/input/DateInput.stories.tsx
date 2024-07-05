import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { useForm, Controller } from 'react-hook-form';
import DateInput, { DateInputProps } from '@/components/molecules/input/DateInput';
import '@/app/globals.css';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  argTypes: {
    selected: {
      control: 'date',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;

const Template: StoryFn<DateInputProps> = (args) => {
  const { control } = useForm({
    defaultValues: {
      date: args.selected,
    },
  });

  return (
    <Controller
      name="date"
      control={control}
      render={({ field }) => (
        <DateInput {...field} selected={field.value} onChange={(date) => field.onChange(date)} />
      )}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  selected: null,
};

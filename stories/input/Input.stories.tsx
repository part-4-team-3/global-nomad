import { Meta, StoryObj } from '@storybook/react';
import Input from '@/components/atoms/input/Input';
import '@/app/globals.css';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: {
      control: 'select',
      options: ['authField', 'formField'],
    },
    hasError: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const AuthField: Story = {
  args: {
    size: 'authField',
    placeholder: 'Auth input',
  },
};

export const FormField: Story = {
  args: {
    size: 'formField',
    placeholder: 'Form input',
  },
};

export const WithError: Story = {
  args: {
    size: 'authField',
    hasError: true,
    placeholder: 'Error state',
  },
};

export const Disabled: Story = {
  args: {
    size: 'authField',
    disabled: true,
    placeholder: 'Disabled input',
  },
};

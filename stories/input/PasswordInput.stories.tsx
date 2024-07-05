import { Meta, StoryObj } from '@storybook/react';
import PasswordInput from '@/components/molecules/input/PasswordInput';
import '@/app/globals.css';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  argTypes: {
    hasError: {
      control: 'boolean',
    },
    isCheck: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    id: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
    id: 'password',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your password',
    id: 'password',
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your password',
    id: 'password',
    disabled: true,
  },
};

export const PasswordCheck: Story = {
  args: {
    placeholder: 'Confirm your password',
    id: 'password-check',
    isCheck: true,
  },
};

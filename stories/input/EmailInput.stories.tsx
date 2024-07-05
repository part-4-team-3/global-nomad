import { Meta, StoryObj } from '@storybook/react';
import EmailInput from '@/components/molecules/input/EmailInput';
import '@/app/globals.css';

const meta: Meta<typeof EmailInput> = {
  title: 'Components/EmailInput',
  component: EmailInput,
  argTypes: {
    hasError: {
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
type Story = StoryObj<typeof EmailInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your email',
    id: 'email',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your email',
    id: 'email',
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your email',
    id: 'email',
    disabled: true,
  },
};

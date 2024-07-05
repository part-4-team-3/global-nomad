import { Meta, StoryFn } from '@storybook/react';
import CloseButton, { Props } from '@/components/atoms/CloseButton/CloseButton';

export default {
  title: 'Components/CloseButton',
  component: CloseButton,
  argTypes: {
    onClose: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<Props> = (args) => <CloseButton {...args} />;

export const Default = Template.bind({});
Default.args = { id: 1 };

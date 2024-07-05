import { Meta, StoryFn } from '@storybook/react';
import ImageUploader from '@/components/organisms/ImageUploader/ImageUploader';

export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
} as Meta;

const Template = () => <ImageUploader />;

export const Default = Template.bind({});

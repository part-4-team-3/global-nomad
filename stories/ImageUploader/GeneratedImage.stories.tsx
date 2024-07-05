import { Meta, StoryFn } from '@storybook/react';
import GeneratedImage, { Props } from '@/components/molecules/GeneratedImage/GeneratedImage';

export default {
  title: 'Components/GeneratedImage',
  component: GeneratedImage,
} as Meta;

const Template: StoryFn<Props> = (args) => <GeneratedImage {...args} />;

export const Default = Template.bind({});
Default.args = {
  key: 1,
  url: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_544_1720146310424.png',
  onClose: (index: number) => {
    console.log(`Close button clicked for index: ${index}`);
  },
};

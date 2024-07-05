import Button from '@/components/atoms/button/Button';
import '@/app/globals.css';

export default {
  title: 'Test/Button',
  component: Button,
};

export const Solid = {
  args: {
    text: 'Button',
    color: 'white',
    size: 's',
    disabled: false,
  },
};

export const Medium = {
  args: {
    text: 'Button',
    color: 'white',
    size: 'm',
  },
};

export const Large = {
  args: {
    text: 'Button',
    color: 'white',
    size: 'l',
  },
};

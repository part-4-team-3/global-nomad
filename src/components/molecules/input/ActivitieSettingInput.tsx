import Input from '@/components/atoms/input/Input';
import { forwardRef } from 'react';

interface ActivitySettingData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: string[];
}

interface Props {
  text: string;
}

const ActivitieSettingInput = ({ text }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8pxr">
      <Input size="authField" placeholder={text} />
    </div>
  );
};

export default ActivitieSettingInput;

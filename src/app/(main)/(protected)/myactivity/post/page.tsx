import ActivityRegistrationForm from '@/components/organisms/activity-registration-form/ActivityRegistrationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '체험 등록 | Global Nomad',
  description: 'global nomad 체험등록 페이지입니다.',
};

export default function Page() {
  return <ActivityRegistrationForm />;
}

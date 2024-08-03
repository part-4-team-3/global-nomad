import { ipCheck } from '@/app/action/ip-check';
import ActivityRegistrationForm from '@/components/organisms/activity-registration-form/ActivityRegistrationForm';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '체험 등록 | Global Nomad',
  description: 'global nomad 체험등록 페이지입니다.',
};

export default async function Page() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/signin?redirect=anotherlogin');
  }

  return <ActivityRegistrationForm />;
}

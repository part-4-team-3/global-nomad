import { ipCheck } from '@/app/action/ip-check';
import Header from '@/components/templates/my-activity/Header';
import Main from '@/components/templates/my-activity/Main';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'myActivity',
  description: '내 체험 관리',
};

export default async function MyActivity() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/calendar');
  }

  return (
    <div className="flex flex-col gap-16pxr lg:gap-24pxr">
      <Header />
      <Main />
    </div>
  );
}

import { ipCheck } from '@/app/action/ip-check';
import Header from '@/components/templates/my-activity/Header';
import Main from '@/components/templates/my-activity/Main';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '내 체험 관리 | Global Nomad',
  description: 'global nomad 내 체험 관리 페이지입니다.',
};

export default async function MyActivity() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/signin?redirect=anotherlogin');
  }

  return (
    <div className="flex flex-col gap-16pxr lg:gap-24pxr">
      <Header />
      <Main />
    </div>
  );
}

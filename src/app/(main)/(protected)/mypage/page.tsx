import { ipCheck } from '@/app/action/ip-check';
import MyPageForms from '@/components/templates/my-page/MyPageForms';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'myPage',
  description: '내 정보 수정',
};

export default async function MyPage() {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/calendar');
  }

  return <MyPageForms />;
}

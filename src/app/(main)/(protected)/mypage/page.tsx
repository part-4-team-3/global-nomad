import { ipCheck } from '@/app/action/ip-check';
import MyPageForms from '@/components/templates/my-page/MyPageForms';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '내 정보 수정 | Global Nomad',
  description: 'global nomad 내 정보 수정 페이지입니다.',
};

export default async function MyPage() {
  const isEqualIpUser = await ipCheck();
  console.log(isEqualIpUser);
  if (isEqualIpUser) {
    redirect('/signin');
  }

  return <MyPageForms />;
}

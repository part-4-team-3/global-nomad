import MyPageForms from '@/components/templates/my-page/MyPageForms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '내 정보 수정 | Global Nomad',
  description: 'global nomad 내 정보 수정 페이지입니다.',
};

export default function MyPage() {
  return <MyPageForms />;
}

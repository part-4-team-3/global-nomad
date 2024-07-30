import MyPageForms from '@/components/templates/my-page/MyPageForms';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'myPage',
  description: '내 정보 수정',
};

export default function MyPage() {
  return <MyPageForms />;
}

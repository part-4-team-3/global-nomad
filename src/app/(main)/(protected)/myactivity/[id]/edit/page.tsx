import { ipCheck } from '@/app/action/ip-check';
import ActivityEditForm from '@/components/organisms/activity-edit-form/ActivityEditForm';
import { getActivityDetails } from '@/queries/activities/get-activity-details';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '체험 수정 | Global Nomad',
  description: 'global nomad 체험 수정 페이지입니다.',
};

interface Props {
  params: { id: number };
}

export default async function ActivityEditPage({ params }: Props) {
  const isEqualIpUser = await ipCheck();
  if (isEqualIpUser) {
    redirect('/signin');
  }

  const initActivity = await getActivityDetails(params.id);
  return <ActivityEditForm initActivity={initActivity} />;
}

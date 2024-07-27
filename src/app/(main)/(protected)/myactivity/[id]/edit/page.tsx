import ActivityEditForm from '@/components/organisms/activity-edit-form/ActivityEditForm';
import { getActivityDetails } from '@/queries/activities/get-activity-details';
interface Props {
  params: { id: number };
}
export default async function ActivityEditPage({ params }: Props) {
  const activityData = await getActivityDetails(params.id);
  return <ActivityEditForm stateData={activityData} />;
}

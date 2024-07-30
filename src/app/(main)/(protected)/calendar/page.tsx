import MyReservation from '@/components/templates/mypage/MyReservation';
import { getInstance } from '@/lib/axios';
import { Activity } from '@/types/activity';
import { isAxiosError } from 'axios';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '예약 연황 | Global Nomad',
  description: 'global nomad 내 체험 현황 페이지입니다.',
};

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function page({ searchParams }: Props) {
  let myReservationByMonth;
  let selectedActivity;
  let myActivtyListResponse;
  const activityId = searchParams['activityId'];
  let year = searchParams['year'];
  let month = searchParams['month'];

  const apiInstance = getInstance();

  myActivtyListResponse = await apiInstance.get(`my-activities`);

  const myActivityList = myActivtyListResponse.data;

  if (activityId) {
    selectedActivity = myActivityList.activities.find(
      (activity: Activity) => String(activity.id) === activityId,
    );

    if (!year || !month) {
      const date = new Date();
      const year = date?.getFullYear().toString();
      const month = (date?.getMonth()! + 1).toString()!.padStart(2, '0');
      redirect(`/calendar?activityId=${activityId}&year=${year}&month=${month}`);
    } else {
      if (Number(month) < 0 || Number(month) > 12) {
        const date = new Date();
        year = date?.getFullYear().toString();
        month = (date?.getMonth()! + 1).toString()!.padStart(2, '0');
        redirect(`/calendar?activityId=${activityId}&year=${year}&month=${month}`);
      }
      month[0].padStart(2, '0');
      try {
        let result = await apiInstance.get(
          `my-activities/${activityId}?year=${year}&month=${month}`,
        );
        myReservationByMonth = result.data;
      } catch (err) {
        redirect('/calendar');
      }
    }
  }

  return (
    <MyReservation
      myActivityList={myActivityList}
      activityId={Number(activityId) || null}
      selectedActivity={selectedActivity}
      myReservationByMonth={myReservationByMonth}
    />
  );
}

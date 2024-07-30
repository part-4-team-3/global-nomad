import MyReservation from '@/components/templates/mypage/MyReservation';
import { getInstance } from '@/lib/axios';

export default async function page() {
  const apiInstance = getInstance();
  const myActivtyListResponse = await apiInstance.get(`my-activities`);
  const myActivtyList = myActivtyListResponse.data;

  return <MyReservation myActivityList={myActivtyList} />;
}

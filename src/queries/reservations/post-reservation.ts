import { getInstance } from '@/lib/axios';

const postReservation = async (
  activityId: number | undefined,
  scheduleId: number | undefined,
  headCount: number,
) => {
  const instance = getInstance();

  const requestBody = {
    scheduleId: scheduleId,
    headCount: headCount,
  };

  try {
    const response = await instance.post(`activities/${activityId}/reservations`, requestBody);
    console.log(response.data);
    return response.status;
  } catch (error) {
    return -1;
  }
};

export default postReservation;
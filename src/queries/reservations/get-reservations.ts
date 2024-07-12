import { apiInstance } from '@/lib/axios';
import makeQueryString from '@/lib/query-string';
import { Reservation, ReservationStatus } from '@/types/reservation';

interface Params {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}

interface GetReservationsResponse {
  totalCount: number;
  reservations: Reservation[];
  cursorId: null | number;
}

export const getReservations = async (params: Params) => {
  const queryString = makeQueryString(params);
  const data = await apiInstance.get<any, GetReservationsResponse>(
    `/my-reservations${queryString}`,
  );
  return data;
};
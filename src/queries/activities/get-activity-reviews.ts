import { getInstance } from '@/lib/axios';
import { Review } from '@/types/review';

interface GetActivityReviewsResponse {
  data: {
    averageRating: number;
    totalCount: number;
    reviews: Review[];
  };
}

const getActivityReviews = async (id: number, currentPage: number) => {
  const apiInstance = getInstance();
  let res;
  try {
    res = await apiInstance.get<any, GetActivityReviewsResponse>(
      `activities/${id}/reviews?page=${currentPage}`,
    );
  } catch (err) {
    return { reviews: [], totalCount: 0, averageRating: 0 };
  }

  return res.data;
};

export { getActivityReviews };

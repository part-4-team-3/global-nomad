import { myActivitiesKeys } from '@/queries/myActivities/query-keys';
import { MyActivityList } from '@/types/activity';
import { InfiniteData, QueryClient } from '@tanstack/react-query';

interface MyActivityPage {
  data: MyActivityList;
}

export default function afterDelete(queryClient: QueryClient, activityId: number) {
  queryClient.setQueryData<InfiniteData<MyActivityPage>>(
    myActivitiesKeys.getMyActivitiesAll(),
    (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            activities: page.data.activities.filter((activity) => activity.id !== activityId),
            totalCount: page.data.totalCount - 1,
          },
        })),
      };
    },
  );
}

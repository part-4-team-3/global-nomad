import { Activity } from '@/types/activity';
import { useEffect, useState } from 'react';

/**
 * 선택된 activityName과 일치하는 activity를 주어진 activityList에서 찾아내는 커스텀 훅입니다.
 *
 * @param myActivityList - Activity 객체의 배열. 이 배열에서 선택된 activity를 찾습니다.
 * @returns activityName: 선택된 activity의 title, setActivityName: activityName을 설정하는 함수, selectedActivity: 선택된 activity의 상태를 반환합니다.
 */
export function useHandleIsSelectdActivity(myActivityList: Activity[] | undefined) {
  const [activityName, setActivityName] = useState<string>(myActivityList?.[0].title || '');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    myActivityList?.[0] || null,
  );

  // myActivityList에서 activity의 title만 추출하여 배열로 만듭니다.
  const activityNameList = myActivityList?.map((activity) => activity.title);

  // 주어진 activityList에서 주어진 activityName과 일치하는 activity를 찾아서 상태를 업데이트하는 함수입니다.
  const handleChangeIsSelectActivity = (activityList: Activity[], activityName: string) => {
    const selectedActivity = activityList.find((activity) => activity.title === activityName);
    if (selectedActivity) {
      setSelectedActivity(selectedActivity);
    }
  };

  // activityName 혹은 myActivityList가 변경될 때마다 handleChangeIsSelectActivity 함수를 재실행합니다.
  useEffect(() => {
    if (myActivityList) {
      handleChangeIsSelectActivity(myActivityList, activityName);
    }
  }, [activityName, myActivityList]);

  return { activityName, activityNameList, selectedActivity, setActivityName };
}

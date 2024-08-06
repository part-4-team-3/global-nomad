import { Activity } from '@/types/activity';
import { useEffect, useState } from 'react';

/**
 * 주어진 activityList에서 선택된 activityName과 일치하는 activity를 찾아내는 커스텀 훅입니다.
 *
 * @param myActivityList - Activity 객체의 배열. 이 배열에서 선택된 activity를 찾습니다.
 * @returns selectedActivity: 선택된 activity의 상태, setSelectedActivity: 선택된 activity를 설정하는 함수
 */
export function useHandleIsSelectdActivity(myActivityList: Activity[] | undefined) {
  const [activityName, setActivityName] = useState<string>(myActivityList?.[0].title || '');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    myActivityList?.[0] || null,
  );

  /**
   * 주어진 activityList에서 주어진 activityName과 일치하는 activity를 찾아서 상태를 업데이트하는 함수입니다.
   *
   * @param activityList - Activity 객체의 배열
   * @param activityName - 찾고자 하는 activity의 이름
   */
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

  return { selectedActivity, setSelectedActivity };
}

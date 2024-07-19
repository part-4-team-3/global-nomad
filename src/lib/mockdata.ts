const mockRevs = [
  {
    id: 1234,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1235,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1236,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1237,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
  {
    id: 1238,
    user: {
      profileImageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/5-3_585_1720404945231.jpeg',
      nickname: '죄송합니다 열심히 할게요',
      id: 2222,
    },
    activityId: 12323,
    rating: 4.9,
    content:
      '저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운 스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에 어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말 좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을 적극 추천합니다!',
    createdAt: '2023-12-31T21:28:50.589Z',
    updatedAt: '2023-12-31T21:28:50.589Z',
  },
];


/*

"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_585_1721287548416.jpeg"

"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_585_1721287596306.jpeg"

"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_585_1721287635546.jpeg"

"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/5-3_585_1721287659848.jpeg"


*/
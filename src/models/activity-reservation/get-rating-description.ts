export const getRatingDescription = (rating: number): string => {
  if (rating === 5) {
    return '극락';
  } else if (rating > 4) {
    return '매우 만족';
  } else if (rating > 3) {
    return '만족';
  } else if (rating > 2) {
    return '불만족';
  } else if (rating > 1) {
    return '매우 불만족';
  } else {
    return '최악';
  }
};

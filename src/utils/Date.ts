export const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '.' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '.' +
    ('0' + date.getDate()).slice(-2)
  );
};

export const JoinDateWithDot = (dates: number[]) => {
  return (
    dates[0] +
    '.' +
    ('0' + dates[1]).slice(-2) +
    '.' +
    ('0' + dates[2]).slice(-2)
  );
};

export const changeDotToHyphen = (date: string) => {
  return date.replace(/\./g, '-');
};

export const getDateDay = (dates: number[]) => {
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  return WEEKDAY[new Date(dates[0], dates[1] - 1, dates[2]).getDay()];
};

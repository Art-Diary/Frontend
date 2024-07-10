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

export const JoinDateWithHyphen = (dates: number[]) => {
  return (
    dates[0] +
    '-' +
    ('0' + dates[1]).slice(-2) +
    '-' +
    ('0' + dates[2]).slice(-2)
  );
};

export const changeDotToHyphen = (date: string) => {
  return date.replace(/\./g, '-');
};

export const splitDate = (date: string | null) => {
  var data;
  var result: number[] = [];

  if (date) {
    data = date.split('-');
  } else {
    data = dateToString(new Date()).split('.');
  }

  result.push(Number(data[0]));
  result.push(Number(data[1]));
  result.push(Number(data[2]));
  return result;
};

export const getDateDay = (dates: number[]) => {
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  return WEEKDAY[new Date(dates[0], dates[1] - 1, dates[2]).getDay()];
};

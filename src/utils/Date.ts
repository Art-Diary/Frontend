export const dateToString = (date: Date) => {
  return (
    date.getFullYear() +
    '.' +
    ('0' + (date.getMonth() + 1)).slice(-2) +
    '.' +
    ('0' + date.getDate()).slice(-2)
  );
};

export const changeDotToHyphen = (date: string) => {
  return date.replace(/\./g, '-');
};

export const getDateDay = (date: string) => {
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const list = date.split('.');
  return WEEKDAY[
    new Date(Number(list[0]), Number(list[1]) - 1, Number(list[2])).getDay()
  ];
};

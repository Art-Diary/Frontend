export const days = ['일', '월', '화', '수', '목', '금', '토'];

export const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

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
  const list = date.split('.');

  return days[
    new Date(Number(list[0]), Number(list[1]) - 1, Number(list[2])).getDay()
  ];
};

export const changeDateTimeFormat = (today: Date) => {
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month + '-' + day;

  var hours = ('0' + today.getHours()).slice(-2);
  var minutes = ('0' + today.getMinutes()).slice(-2);
  var seconds = ('0' + today.getSeconds()).slice(-2);

  var timeString = hours + ':' + minutes + ':' + seconds;
  return dateString + ' ' + timeString;
};

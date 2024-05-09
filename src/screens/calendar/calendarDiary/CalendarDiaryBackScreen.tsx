import React from 'react';
import {useMyDiaryBackInfo} from '~/zustand/mydiary/mydiary';
import DiaryBackFrame from '~/components/diary/DiaryBackFrame';

const CalendarDiaryBackScreen = () => {
  const myDiaryBackInfo = useMyDiaryBackInfo();

  return <DiaryBackFrame backInfo={myDiaryBackInfo} />;
};

export default CalendarDiaryBackScreen;

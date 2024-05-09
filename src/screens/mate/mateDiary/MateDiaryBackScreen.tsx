import React from 'react';
import {useMateDiaryBackInfo} from '~/zustand/mate/queryMateDiary';
import DiaryBackFrame from '~/components/diary/DiaryBackFrame';

const MateDiaryBackScreen = () => {
  const mateDiaryBackInfo = useMateDiaryBackInfo();

  return <DiaryBackFrame backInfo={mateDiaryBackInfo} />;
};

export default MateDiaryBackScreen;

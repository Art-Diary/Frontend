import React from 'react';
import DiaryList from '../../../components/diary/DiaryList';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';

const MyDiaryList = () => {
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {
    data: myDiaryList,
    isLoading,
    isError,
  } = useFetchMyDiaryList(visitedExhId);

  if (isError) {
    return <ErrorMessageView message={'내 다이어리 목록 조회 실패 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />;
  }

  if (myDiaryList.length === 0) {
    return <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />;
  }

  return <DiaryList diaryList={myDiaryList} />;
};

export default MyDiaryList;

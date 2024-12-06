import React, {useEffect} from 'react';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useFetchMateDiaryList} from '~/api/queries/mate';
import {useQueryMateDiaryInfo} from '~/zustand/mate/queryMateDiary';
import DiaryList from '~/components/common/diary/DiaryList';
import {useIsFocused} from '@react-navigation/native';

const FetchMateDiaryList = () => {
  const isFocused = useIsFocused();
  const queryInfo = useQueryMateDiaryInfo();
  const {
    data: mateDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchMateDiaryList(
    queryInfo.mateInfo.mateId,
    queryInfo.mateInfo.exhId,
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return <ErrorMessageView message="전시 메이트 다이어리 조회 실패 ;(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시 메이트 다이어리 조회 중 :)" />;
  }

  if (mateDiaryList.length === 0) {
    return <ErrorMessageView message="아직 전시회에 대한 기록이 없습니다." />;
  }

  return <DiaryList diaryList={mateDiaryList} />;
};

export default FetchMateDiaryList;

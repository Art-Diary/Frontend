import React, {useEffect, useState} from 'react';
import InfoMessageView from '~/components/common/InfoMessageView';
import {useFetchMateDiaryList} from '~/api/queries/mate';
import {useQueryMateDiaryInfo} from '~/zustand/mate/queryMateDiary';
import DiaryList from '~/components/common/diary/DiaryList';
import {useIsFocused} from '@react-navigation/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

const FetchMateDiaryList = () => {
  const isFocused = useIsFocused();
  const queryInfo = useQueryMateDiaryInfo();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
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

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {mateDiaryList &&
        (!mateDiaryList.length ? (
          <InfoMessageView message="아직 전시회에 대한 기록이 없습니다." />
        ) : (
          <DiaryList diaryList={mateDiaryList} />
        ))}
    </>
  );
};

export default FetchMateDiaryList;

import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useFetchMateDiaryList} from '~/api/queries/mate';
import {useQueryMateDiaryInfo} from '~/zustand/mate/queryMateDiary';
import DiaryList from '~/components/diary/DiaryList';
import {useIsFocused} from '@react-navigation/native';

const MateDiaryListScreen = () => {
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
    return <ErrorMessageView message="전시 메이트 다이어리 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시 메이트 다이어리 조회 중:)" />;
  }
  return (
    <Container>
      {/* header */}
      <BackView line={false} />

      {/* body */}
      <DiaryList diaryList={mateDiaryList} />
    </Container>
  );
};

export default MateDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

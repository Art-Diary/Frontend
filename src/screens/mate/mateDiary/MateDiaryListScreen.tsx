import React from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useFetchMateDiaryList} from '~/api/queries/mate';
import {useQueryMateDiaryInfo} from '~/zustand/mate/queryMateDiary';
import DiaryList from '~/components/diary/DiaryList';

const MateDiaryListScreen = () => {
  const queryInfo = useQueryMateDiaryInfo();
  const {
    data: mateDiaryList,
    isLoading,
    isError,
  } = useFetchMateDiaryList(
    queryInfo.mateInfo.mateId,
    queryInfo.mateInfo.exhId,
  );

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
      <DiaryList diaryList={mateDiaryList} isMateDiary={true} />
    </Container>
  );
};

export default MateDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

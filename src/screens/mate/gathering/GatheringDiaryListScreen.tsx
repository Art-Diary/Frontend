import {RouteProp} from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';
import {useFetchGatheringDiaryList} from '~/api/queries/gathering';
import BackView from '~/components/common/BackView';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';
import {useGatheringListParamsInfo} from '~/zustand/gathering/gathering';

const GatheringDiaryListScreen = () => {
  const {params} = useGatheringListParamsInfo();
  const {
    data: gatheringDiaryList,
    isLoading,
    isError,
  } = useFetchGatheringDiaryList(params.gatherId, params.exhId);

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
      {gatheringDiaryList.length === 0 ? (
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList diaryList={gatheringDiaryList} />
      )}
    </Container>
  );
};

export default GatheringDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

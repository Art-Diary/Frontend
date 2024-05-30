import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {useFetchStoredDateOfExhInGroup} from '~/api/queries/exhibition';
import NewVisitDateInGathering from './NewVisitDateInGathering';
import LoadingModal from '~/components/common/modal/LoadingModal';

const NewVisitDateOfExhInGatheringScreen = () => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {enterGatheringInfo} = useEnterGatheringInfo();
  // 모임에서 방문한 날짜 리스트 가져오기
  const {
    data: storedDateList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchStoredDateOfExhInGroup(visitedExhId, enterGatheringInfo.gatherId);

  useEffect(() => {
    // 다른 화면을 갔다왔을때 갱신
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    showToast('오류가 발생했습니다.');
  }
  if (isLoading) {
    <LoadingModal message="방문 날짜 조회 중" />;
  }

  return (
    <Container>
      <BackView line={false} children={null} />
      {isSuccess && (
        <NewVisitDateInGathering markedDates={storedDateList.dates} />
      )}
    </Container>
  );
};

export default NewVisitDateOfExhInGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

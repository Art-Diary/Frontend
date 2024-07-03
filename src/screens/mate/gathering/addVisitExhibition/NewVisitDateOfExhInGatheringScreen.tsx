import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';
import {useFetchStoredDateOfExhInGroup} from '~/api/queries/exhibition';
import NewVisitDateInGathering from './NewVisitDateInGathering';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {BACK_COLOR} from '~/components/common/colors';

const NewVisitDateOfExhInGatheringScreen = () => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {enterGatheringInfo} = useEnterGatheringInfo();
  const [openLoading, setOpenLoading] = useState(false);
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

  useEffect(() => {
    if (isError) {
      showToast('모임의 방문 날짜 조회 실패 ;(');
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isError, isLoading]);

  return (
    <Container>
      <BackView line={false} children={null} />
      <NewVisitDateInGathering
        markedDates={storedDateList ? storedDateList.dates : []}
      />
      {openLoading && <LoadingModal message={'방문 날짜 조회 중 :)'} />}
    </Container>
  );
};

export default NewVisitDateOfExhInGatheringScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {WriteDiaryButton} from '~/assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';

const CalendarDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const exhFromCalendarInfo = useExhFromCalendarInfo();
  const {updateIsUpdate, updateforIds} = useWriteMyDiaryActions();
  const {
    data: diaryList,
    isLoading,
    isError,
  } = useFetchMyDiaryList(
    visitedExhId,
    exhFromCalendarInfo.forget,
    exhFromCalendarInfo.visitDate,
    exhFromCalendarInfo.gatherId,
  );

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />;
  }

  if (diaryList.length === 0) {
    return (
      <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />
    );
  }

  const onPressButton = () => {
    updateIsUpdate(false);
    updateforIds(
      null,
      exhFromCalendarInfo.userExhId ?? -1,
      exhFromCalendarInfo.gatherExhId ?? -1,
    );
    // navigation.navigate('WriteDiaryRoutes');
  };

  return (
    <Container>
      {/* header */}
      <BackView line={false}>
        <TouchableOpacity onPress={onPressButton}>
          <WriteDiaryButton />
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <DiaryList diaryList={diaryList} />
    </Container>
  );
};

export default CalendarDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  align-items: center;
  width: 100%;
`;

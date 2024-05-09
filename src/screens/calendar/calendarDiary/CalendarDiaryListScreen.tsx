import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {WriteDiaryButton} from '~/assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import CalendarDiaryList from './CalendarDiaryList';

const CalendarDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const exhFromCalendarInfo = useExhFromCalendarInfo();
  const {updateIsUpdate, updateforIds} = useWriteMyDiaryActions();

  const onPressButton = () => {
    updateIsUpdate(false);
    updateforIds(
      null,
      exhFromCalendarInfo.userExhId ?? -1,
      exhFromCalendarInfo.gatherExhId ?? -1,
    );
    navigation.navigate('WriteMyDiaryRoutes');
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
      <CalendarDiaryList />
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

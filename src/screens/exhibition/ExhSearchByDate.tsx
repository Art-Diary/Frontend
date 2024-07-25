import {Modal} from 'react-native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import {BackButtonIcon} from '~/components/common/icon';
import {useDateFromExhInfo} from '~/zustand/calendar/dateFromExh';
import {useAddScheduleActions} from '~/zustand/calendar/addSchedule';
import CustomTouchable from '~/components/common/CustomTouchable';

interface ExhSearchByDateProps {
  isVisible: boolean;
  date: string | null;
  onClose: () => void;
}

const ExhSearchByDate: React.FC<ExhSearchByDateProps> = ({
  isVisible,
  onClose,
}) => {
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(dateToString(new Date()));
  const {date: dateFromExhInfo} = useDateFromExhInfo();
  const {updateAddDate} = useAddScheduleActions();

  const onPressDate = () => {
    const dateObject = changeDotToHyphen(selectedDate);
    console.log('dateObject', dateObject);
    updateAddDate(dateObject);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Container>
        <Backview>
          <CustomTouchable onPress={onClose}>
            <BackButtonIcon />
          </CustomTouchable>
        </Backview>
        <ContentView>
          <TextView>{'날짜 선택'}</TextView>
          <CustomCalendar
            initDate={dateFromExhInfo ?? dateToString(new Date())}
            onSelectedDate={setSelectedDate}
            markedDates={[]}
            setChangeMonth={setChangeMonth}
          />
          <DateView>
            <TextView>{'선택한 날짜'}</TextView>
            <TextView>{selectedDate}</TextView>
          </DateView>
        </ContentView>
        <CustomTouchable onPress={onPressDate}>
          <CompleteButton>{'선택 완료'}</CompleteButton>
        </CustomTouchable>
      </Container>
    </Modal>
  );
};

export default ExhSearchByDate;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding-left: ${wp(3)}px;
  padding-right: ${wp(4)}px;
`;

const Backview = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${wp(3)}px;
  padding-bottom: ${wp(1)}px;
`;

const ContentView = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${wp(0.4)}px;
  padding-right: ${wp(0.4)}px;
  padding-top: ${wp(2.9)}px;
  gap: ${wp(3.3)}px;
`;

const DateView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const TextView = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const CompleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${MAIN_COLOR};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

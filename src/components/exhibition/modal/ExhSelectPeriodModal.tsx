import React, {useState} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {
  BACK_COLOR,
  DARK_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';
import {BackButtonIcon} from '~/components/common/icon';
import ExhSelectPeriodCalendar from '../ExhSelectPeriodCalendar';

interface ExhSelectPeriodProps {
  onClose: () => void;
  startPeriod: string;
  endPeriod: string;
  handleSelectedPeriod: (startPeriod: string, endPeriod: string) => void;
}

const ExhSelectPeriod: React.FC<ExhSelectPeriodProps> = ({
  onClose,
  startPeriod,
  endPeriod,
  handleSelectedPeriod,
}) => {
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(startPeriod); // 선택한 시작 날짜
  const [selectedEndDate, setSelectedEndDate] = useState<string>(endPeriod); // 선택한 종료 날짜

  const handleComplete = () => {
    if (selectedStartDate === '' || selectedEndDate === '') {
      handleSelectedPeriod('', '');
    } else {
      handleSelectedPeriod(selectedStartDate, selectedEndDate);
    }
    onClose();
  };

  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
      <Container>
        <Backview>
          <CustomTouchable onPress={onClose}>
            <BackButtonIcon />
          </CustomTouchable>
        </Backview>
        <ContentView>
          <TextView>{'날짜 선택'}</TextView>
          <ExhSelectPeriodCalendar
            selectStartPeriod={selectedStartDate}
            selectEndPeriod={selectedEndDate}
            onSelectStartPeriod={setSelectedStartDate}
            onSelectEndPeriod={setSelectedEndDate}
          />
          <DateView>
            <TextView>{'시작 날짜'}</TextView>
            <SelectedDateText>
              {selectedStartDate === '' ? '시작 날짜 선택' : selectedStartDate}
            </SelectedDateText>
          </DateView>
          <DateView>
            <TextView>{'종료 날짜'}</TextView>
            <SelectedDateText>
              {selectedEndDate === '' ? '종료 날짜 선택' : selectedEndDate}
            </SelectedDateText>
          </DateView>
        </ContentView>
        <CustomTouchable onPress={handleComplete}>
          <CompleteButton>{'완료'}</CompleteButton>
        </CustomTouchable>
      </Container>
    </Modal>
  );
};

export default ExhSelectPeriod;

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
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const SelectedDateText = styled.Text`
  font-size: ${rf(15.5)}px;
  color: ${MIDDLE_GREY};
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

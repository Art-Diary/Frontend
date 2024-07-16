import React, {ReactNode} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../common/style';
import {DEFAULT_TEXT, LIGHT_GREY, MAIN_COLOR} from '../common/colors';
import {dateToString} from '~/utils/Date';
import {useDateFromExhInfo} from '~/zustand/calendar/dateFromExh';

interface MarkedType {
  date: string;
  color: string[];
}

interface AddVisitDateProps {
  markedDates: MarkedType[];
  selectedDate: string;
  onSelectedDate: (selectedDate: string) => void;
  onClickNextButton: () => void;
  children?: ReactNode;
  selectedMssg?: string;
}

const AddVisitDate: React.FC<AddVisitDateProps> = ({
  markedDates,
  selectedDate,
  onSelectedDate,
  onClickNextButton,
  children,
  selectedMssg,
}) => {
  const {date: dateFromExhInfo} = useDateFromExhInfo();
  const alreadyMarkedDate = () => {
    for (var marked = 0; marked < markedDates.length; marked++) {
      if (markedDates[marked].date === selectedDate) {
        return true;
      }
    }
    return false;
  };

  return (
    <ContentsContainer>
      {/* 방문 날짜 선택 */}
      <GroupText>방문 날짜 선택</GroupText>
      {/* 커스텀 캘린더 */}
      <CustomCalendar
        initDate={dateFromExhInfo ?? dateToString(new Date())}
        onSelectedDate={onSelectedDate}
        markedDates={markedDates}
      />
      {/* 선택한 날짜 표시 */}
      <View style={{flex: 1}}>
        <BodyView>
          <BodyText> {selectedMssg ?? '추가할 날짜'}</BodyText>
          <BodyText>{selectedDate}</BodyText>
        </BodyView>
        {children}
      </View>
      {/* 하단 버튼 */}
      {alreadyMarkedDate() ? (
        <NextButton isAlready={true}>이미 저장된 방문 날짜입니다</NextButton>
      ) : (
        <TouchableOpacity onPress={onClickNextButton}>
          <NextButton isAlready={false}>날짜 선택 완료</NextButton>
        </TouchableOpacity>
      )}
    </ContentsContainer>
  );
};

export default AddVisitDate;

/** style */
const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-bottom: ${hp(1)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;

const GroupText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-bottom: ${hp(1.8)}px;
`;

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${hp(2.5)}px;
  padding-bottom: ${hp(1)}px;
`;

const BodyText = styled.Text`
  font-size: ${rf(16.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

interface NextButtonProps {
  isAlready: boolean;
}
const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isAlready ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

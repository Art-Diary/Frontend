import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '../common/style';
import {DARK_GREY} from '../common/colors';
import CalendarFrame from '../common/CalendarFrame';
import {MarkedType} from '~/types';

interface CalendarSelectDateProps {
  initDate: string;
  markedDates: MarkedType[];
  selectedDate: string;
  onSelectedDate: (selectedDate: string) => void;
  children?: ReactNode;
}

const CalendarSelectDateFrame: React.FC<CalendarSelectDateProps> = ({
  initDate,
  markedDates,
  selectedDate,
  onSelectedDate,
  children,
}) => {
  return (
    <ContentsContainer>
      {/* 커스텀 캘린더 */}
      <CalendarFrame
        initDate={initDate}
        onSelectedDate={onSelectedDate}
        markedDates={markedDates}
      />
      {/* 선택한 날짜 표시 */}
      <BodyWrapper>
        <BodyView>
          <BodyText>선택한 날짜</BodyText>
          <BodyText>{selectedDate}</BodyText>
        </BodyView>
        {children}
      </BodyWrapper>
    </ContentsContainer>
  );
};

export default CalendarSelectDateFrame;

/** style */
const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

const BodyWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${hp(2.5)}px;
  gap: ${hp(1.6)}px;
`;

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const BodyText = styled.Text`
  font-size: ${rf(16.5)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

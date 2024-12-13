import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import CustomTouchable from '../CustomTouchable';

interface FormProps {
  startDate: string;
  endDate: string;
  handleOpenModal: () => void;
}

const EditExhDateForm: React.FC<FormProps> = ({
  startDate,
  endDate,
  handleOpenModal,
}) => {
  return (
    <Container>
      {/* section 날짜 */}
      <SectionWapper>
        <SectionStar>*</SectionStar>
        <SectionName>전시회 일정</SectionName>
      </SectionWapper>
      {/* section 내용 */}
      <BodyWrapper>
        <CustomTouchable onPress={handleOpenModal}>
          {startDate === '' || endDate === '' ? (
            <DateText grey>일정 선택 (클릭)</DateText>
          ) : (
            <DateText>
              {startDate} ~ {endDate}
            </DateText>
          )}
        </CustomTouchable>
      </BodyWrapper>
    </Container>
  );
};

export default EditExhDateForm;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
  gap: ${hp(1.3)}px;
  justify-content: space-between;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
`;

const SectionStar = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;

const BodyWrapper = styled.View`
  flex-direction: column;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(4)}px;
`;

interface DateTextProps {
  grey: boolean;
}

const DateText = styled.Text<DateTextProps>`
  font-size: ${rf(15.5)}px;
  color: ${(props: DateTextProps) =>
    props.grey ? `${MIDDLE_GREY}` : `${DEFAULT_TEXT}`};
  font-family: ${FONT_NAME};
`;

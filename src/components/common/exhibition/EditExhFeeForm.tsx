import React, {useCallback} from 'react';
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
import {removeControlCharacter} from '~/utils/keyword';

interface FormProps {
  maxLen?: number;
  keyword: string;
  handleKeyword: (text: string) => void;
}

const EditExhFeeForm: React.FC<FormProps> = ({
  maxLen,
  keyword,
  handleKeyword,
}) => {
  const onChangeKeyword = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);
    const numericText = cleaned.replace(/[^0-9]/g, ''); // 숫자만 허용
    handleKeyword(numericText);
  }, []);

  return (
    <Container>
      {/* section 날짜 */}
      <SectionWapper>
        <SectionStar>*</SectionStar>
        <SectionName>전시회 관람료</SectionName>
      </SectionWapper>
      {/* section 내용 */}
      <BodyWrapper>
        <TextInputView
          keyboardType={'number-pad'}
          maxLength={maxLen}
          placeholderTextColor={MIDDLE_GREY}
          placeholder={!keyword ? '입력' : ''}
          onChangeText={onChangeKeyword}
          value={keyword}
        />
        <SectionName color={'default'}>원</SectionName>
      </BodyWrapper>
    </Container>
  );
};

export default EditExhFeeForm;

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
  flex-direction: row;
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  align-items: center;
`;

const TextInputView = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 3%;
  padding-top: 0%;
  padding-bottom: 0%;
  max-width: 97%;
`;

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

interface SayingInputFormProps {
  maxLen?: number;
  keyword: string;
  handleKeyword: (text: string) => void;
}

const SayingInputForm: React.FC<SayingInputFormProps> = ({
  maxLen,
  keyword,
  handleKeyword,
}) => {
  const onChangeKeyword = useCallback((text: string) => {
    handleKeyword(text);
  }, []);

  return (
    <Container>
      {/* section 제목 */}
      <CountWrapper>
        <SectionWapper>
          <SectionStar>*</SectionStar>
          <SectionName>한마디</SectionName>
        </SectionWapper>
        <CountText>
          ( {keyword ? keyword.length : 0} / {maxLen} )
        </CountText>
      </CountWrapper>
      {/* section 내용 */}
      <BodyWrapper>
        <SectionName>"</SectionName>
        <TextInputView
          multiline={true}
          maxLength={maxLen}
          placeholderTextColor={MIDDLE_GREY}
          placeholder={!keyword ? '한마디' : ''}
          value={keyword}
          onChangeText={onChangeKeyword}
        />
        <SectionName>"</SectionName>
      </BodyWrapper>
    </Container>
  );
};

export default SayingInputForm;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
  gap: ${hp(1.3)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const CountText = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;

const CountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
`;

const TextInputView = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  max-width: 97%;
`;

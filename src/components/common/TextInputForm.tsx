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
} from '~/components/common/colors';

interface TextInputFormProps {
  title: string;
  isEssential?: boolean;
  maxLen?: number;
  multiLine?: boolean;
  keyword: string;
  handleKeyword: (text: string) => void;
  direction?: 'row' | 'column';
}

const TextInputForm: React.FC<TextInputFormProps> = ({
  title,
  isEssential,
  maxLen,
  multiLine,
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
          {isEssential && <SectionStar>*</SectionStar>}
          <SectionName>{title}</SectionName>
        </SectionWapper>
        {maxLen && (
          <CountText>
            ( {keyword ? keyword.length : 0} / {maxLen} )
          </CountText>
        )}
      </CountWrapper>
      {/* section 내용 */}
      <BodyWrapper>
        <TextInputView
          multiline={multiLine}
          maxLength={maxLen}
          placeholderTextColor={MIDDLE_GREY}
          placeholder={!keyword ? title : ''}
          value={keyword}
          onChangeText={onChangeKeyword}
        />
      </BodyWrapper>
    </Container>
  );
};

export default TextInputForm;

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
  flex-direction: column;
  background-color: #f6f0f0;
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

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
  DARK_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import {removeControlCharacter} from '~/utils/keyword';

interface TextInputFormProps {
  title: string;
  isEssential?: boolean;
  maxLen?: number;
  multiLine?: boolean;
  keyword: string;
  handleKeyword: (text: string) => void;
  full?: boolean;
}

const TextInputForm: React.FC<TextInputFormProps> = ({
  title,
  isEssential,
  maxLen,
  multiLine,
  keyword,
  handleKeyword,
  full,
}) => {
  const onChangeKeyword = useCallback((text: string) => {
    const cleaned = removeControlCharacter(text);

    handleKeyword(cleaned);
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
      <BodyWrapper full={full}>
        <TextInputView
          multiline={multiLine}
          maxLength={maxLen}
          placeholderTextColor={MIDDLE_GREY}
          placeholder={!keyword ? title : ''}
          textAlignVertical={'top'}
          value={keyword}
          onChangeText={onChangeKeyword}
          full={full}
        />
      </BodyWrapper>
    </Container>
  );
};

export default TextInputForm;

/** style */
const Container = styled.View`
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
  gap: ${hp(1.3)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DARK_GREY};
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
  background-color: ${TEXTINPUTFORM_COLOR};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
`;

interface TextInputProps {
  full: number;
}

const TextInputView = styled.TextInput<TextInputProps>`
  font-size: ${rf(16)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  max-width: 97%;
  height: ${(props: TextInputProps) => props.full && `95%`};
`;

import React from 'react';
import {RichEditor} from 'react-native-pell-rich-editor';
import styled from 'styled-components/native';
import FontFamilyStylesheet from '~/assets/fonts/stylesheet';
import {DEFAULT_TEXT} from '../common/colors';

interface ContentsProps {
  contents: string;
}

const ContentsInfo: React.FC<ContentsProps> = ({contents}) => {
  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    backgroundColor: 'white',
    contentCSSText: `font-family: omyu_pretty; font-size: 24px; color: ${DEFAULT_TEXT}; height: 100%;`,
  };

  return (
    <Container>
      {/* 내용 */}
      <ContentWrapper>
        <ContentScroll>
          <RichEditor
            editorStyle={initialCSSText}
            initialContentHTML={contents} // 저장된 내용을 설정하여 출력
            disabled // 수정 불가능하도록 설정
          />
        </ContentScroll>
      </ContentWrapper>
    </Container>
  );
};

export default ContentsInfo;

/** style */
const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentWrapper = styled.View`
  height: 100%;
  width: 100%;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

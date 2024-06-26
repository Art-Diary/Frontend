import React from 'react';
import {RichEditor} from 'react-native-pell-rich-editor';
import styled from 'styled-components/native';
import FontFamilyStylesheet from '~/assets/fonts/stylesheet';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot} from '~/utils/Date';

interface ContentsProps {
  contents: string;
  writeDate: number[];
}

const ContentsInfo: React.FC<ContentsProps> = ({contents, writeDate}) => {
  const initialCSSText = {
    initialCSSText: `${FontFamilyStylesheet}`,
    backgroundColor: 'white',
    contentCSSText: `font-family: omyu_pretty; font-size: 24px; color: #3c4045; height: 100%;`,
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

      {/* 작성 날짜 */}
      <WriteDateView>
        <WriteDateText>작성날짜</WriteDateText>
        <WriteDateText>{JoinDateWithDot(writeDate)}</WriteDateText>
      </WriteDateView>
    </Container>
  );
};

export default ContentsInfo;

/** style */
const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${hp(15.7)}px;
`;

const ContentWrapper = styled.View`
  height: 100%;
  width: 100%;
  padding-bottom: ${hp(10)}px;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

const WriteDateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: ${wp(20)}px;
  padding-right: ${wp(20)}px;
`;

const WriteDateText = styled.Text`
  font-size: ${fp(16.8)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
`;

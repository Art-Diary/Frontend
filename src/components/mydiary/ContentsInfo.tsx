import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface ContentsProps {
  contents: string;
  writeDate: number[];
}

// const {width} = Dimensions.get('window');
// const measureWidth = (text: string) => {
//   const font = 16; // 텍스트의 폰트 크기 설정
//   const adjustedWidth = width - 20; // 텍스트 컨테이너의 가로 너비에서 여유 공간 제외
//   const numOfCharsPerLine = Math.floor(adjustedWidth / font);
//   return Math.ceil(text.length / numOfCharsPerLine) * font;
// };

const test = (text: string): string[] => {
  const width = fp(25);
  var textList: string[] = [];
  let newText = text;
  while (newText.length > width) {
    textList.push(newText.slice(0, width));
    newText = newText.slice(width, newText.length - 1);
  }
  if (newText.length > 0) {
    textList.push(newText.slice(0, -1));
  }
  return textList;
};

const ContentsInfo: React.FC<ContentsProps> = ({contents, writeDate}) => {
  contents =
    contents +
    '아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고아기자기 귀엽고 재밌고';
  const sentences = test(contents); // 나중에 기록 추가할 때 줄바꿈 데이터 넣으면 바꾸기.
  //   const sentences: string[] = [];

  return (
    <Container>
      {/* 내용 */}
      <ContentWrapper>
        <ContentScroll>
          {sentences.map((sentence, index) => (
            <ContentsView key={index}>
              <ContentsText>{sentence}</ContentsText>
              <DotLine />
            </ContentsView>
          ))}
        </ContentScroll>
      </ContentWrapper>

      {/* 작성 날짜 */}
      <WriteDateView>
        <WriteDateText>작성날짜</WriteDateText>
        <WriteDateText>
          {writeDate[0]}.{writeDate[1] < 10 ? 0 : ''}
          {writeDate[1]}.{writeDate[2] < 10 ? 0 : ''}
          {writeDate[2]}
        </WriteDateText>
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
  padding-bottom: ${hp(28)}px;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
`;

const ContentsView = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 15px;
  gap: 5px;
`;

const ContentsText = styled.Text`
  font-size: ${fp(15)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-align: center;
`;

const WriteDateView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const WriteDateText = styled.Text`
  font-size: ${fp(16.8)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
`;

const DotLine = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`;

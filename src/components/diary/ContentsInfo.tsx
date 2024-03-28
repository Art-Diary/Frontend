import React from 'react';
import styled from 'styled-components/native';
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

const divideLines = (text: string): string[] => {
  const width = Math.floor(wp(420) / fp(15));
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
  const longWord =
    contents +
    'sonjdnlfkjenwsonj해리퐅터숫다dnlfkjenwㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜsonjdnlfkjenwso해리퐅터숫다njdnlfkjenwsonjdnlfkjenws해리퐅터숫다onjdnlf해리퐅터숫다kjenwsonjdnlfkjenwsonjdn해리퐅터숫다lfkjenwsonjdnlfkjenw';
  const sentences = divideLines(contents); // 나중에 기록 추가할 때 줄바꿈 데이터 넣으면 바꾸기.

  return (
    <Container>
      {/* 내용 */}
      <ContentWrapper>
        <ContentScroll>
          {sentences.map((sentence, index) => (
            <ContentsView key={index}>
              <ContentsText>{sentence}</ContentsText>
              {sentences.length - 1 !== index && <DotLine />}
            </ContentsView>
          ))}
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
  padding-bottom: ${hp(28)}px;
`;

const ContentScroll = styled.ScrollView`
  height: 100%;
  width: 100%;
`;

const ContentsView = styled.View`
  width: 100%;
  padding-top: 10px;
  gap: 10px;
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
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #d3d3d3;
`;

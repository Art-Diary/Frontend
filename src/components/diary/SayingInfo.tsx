import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import HighlightText from 'react-native-highlight-underline-text';

interface SayingProps {
  saying: string;
  exhName: string;
}

const SayingInfo: React.FC<SayingProps> = ({saying, exhName}) => {
  return (
    <Container>
      {/* 한마디 */}
      <SayingText>한마디</SayingText>
      <SayingContentView>
        <HighlightText
          isFixed={false}
          underlineSize={0}
          bottom={4}
          ratio={0.1}
          underlineColor="#ec2"
          textStyle={{
            color: '#333333',
            fontSize: 30,
          }}
          text="Custom Highlight Underline Text"
        />

        {/* <HighlightText ratio={0.3} text="ratio" /> */}
        {/* <HighlightText ratio={0.3} text="ratio" /> */}
        <ContentText numberOfLines={8}>
          <QuoteText>"</QuoteText>
          {saying}
          <QuoteText>"</QuoteText>
        </ContentText>
      </SayingContentView>
      {/* 전시회 제목 */}
      <ContentText>{exhName}</ContentText>
    </Container>
  );
};

export default SayingInfo;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: ${hp(12)}px;
  padding-bottom: ${hp(12)}px;
  border-style: dashed;
  border-color: #d3d3d3;
  border-top-width: ${wp(1.3)}px;
`;

const SayingText = styled.Text`
  font-size: ${fp(23.5)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;
const SayingContentView = styled.View`
  flex-direction: row;
`;

const ContentText = styled.Text`
  font-size: ${fp(18.5)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-decoration: underline solid #8e8e93;
  /* 출처: https://honeystorage.tistory.com/329 [꿀팁 저장소:티스토리] */
  /* border-bottom-width: 1px; */
  /* text-decoration-line: underline;
  text-decoration-color: red;
  text-decoration-style: solid; */
  /* text-underline-offset: 1px; */
  /* text-underline-position: left; */
`;

const QuoteText = styled.Text`
  font-size: ${fp(25.8)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

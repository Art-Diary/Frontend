import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
        <QuoteText>"</QuoteText>
        <ContentText numberOfLines={8}>{saying}</ContentText>
        <QuoteText>"</QuoteText>
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
`;

const QuoteText = styled.Text`
  font-size: ${fp(25.8)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import {DASH_WIDTH, FONT_NAME} from '../common/style';
import {DEFAULT_TEXT, LIGHT_GREY} from '../common/colors';

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
  /* flex: 1; */
  height: ${hp(29)}px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: ${hp(2)}px;
  border-style: dashed;
  border-color: ${LIGHT_GREY};
  border-top-width: ${DASH_WIDTH}px;
`;

const SayingText = styled.Text`
  font-size: ${rf(22.3)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;
const SayingContentView = styled.View`
  flex-direction: row;
`;

const ContentText = styled.Text`
  font-size: ${rf(18)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const QuoteText = styled.Text`
  font-size: ${rf(24.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

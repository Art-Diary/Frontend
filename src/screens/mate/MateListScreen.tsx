import React from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';

const MateListScreen = () => {
  return (
    <Container>
      {/* header */}
      <Header title={'전시메이트'} children={null} />

      {/* body */}
      <Contents>
        <ContentText>전시메이트</ContentText>
      </Contents>
    </Container>
  );
};

export default MateListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;

const ContentText = styled.Text`
  font-size: ${fp(22)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

import React from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';

const SettingScreen = () => {
  return (
    <Container>
      {/* header */}
      <Header title={'설정'} children={null} />

      {/* body */}
      <Contents>
        <ContentText>설정</ContentText>
      </Contents>
    </Container>
  );
};

export default SettingScreen;

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

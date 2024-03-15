import React from 'react';
import styled from 'styled-components/native';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';

const MyExhAddScreen = () => {
  return <ContentText>[내 기록] 전시회 추가 화면</ContentText>;
};

export default MyExhAddScreen;

/** style */
const ContentText = styled.Text`
  flex: 1;
  font-size: ${fp(22)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

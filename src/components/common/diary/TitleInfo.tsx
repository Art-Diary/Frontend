import React from 'react';
import styled from 'styled-components/native';
import {responseFont as rf} from '~/components/common/ResponsiveSize';
import {DEFAULT_TEXT} from '../colors';
import {FONT_NAME} from '../style';

interface TitleProps {
  diaryInfo: any;
}

const TitleInfo: React.FC<TitleProps> = ({diaryInfo}) => {
  return (
    <Container>
      {/* 기록 제목 */}
      <TitleText>{diaryInfo.title}</TitleText>
    </Container>
  );
};

export default TitleInfo;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: ${rf(24.3)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

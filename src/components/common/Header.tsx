import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DASH_WIDTH, FONT_NAME, HEADER_FONT_SIZE} from './style';
import {
  BACK_COLOR,
  BORDER_COLOR,
  DEFAULT_TEXT,
} from '~/components/common/colors';

interface HeaderProps {
  title: string; // title prop의 타입을 문자열로 지정
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({title, children}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

export default Header;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between; // 양 끝으로 버튼 배치
  align-items: center;
  padding: ${wp(4)}px;
  width: 100%;
  border-style: dashed;
  border-color: ${BORDER_COLOR};
  border-bottom-width: ${DASH_WIDTH}px;
  background-color: ${BACK_COLOR};
`;

const Title = styled.Text`
  font-size: ${HEADER_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

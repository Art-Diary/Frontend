import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
  padding: ${hp(12)}px;
  width: 100%;
  height: ${hp(42)}px;
  border-style: dashed;
  border-color: #d3d3d3;
  border-bottom-width: ${wp(1.3)}px;
  background-color: #f6f6f6;
`;

const Title = styled.Text`
  font-size: ${fp(22)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

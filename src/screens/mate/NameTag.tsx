import React, {ReactNode} from 'react';
import {Svg, SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {widthPercentage as wp} from '~/components/common/ResponsiveSize';

interface TagProps {
  isSelected?: boolean;
  children: ReactNode;
}

const NameTag: React.FC<TagProps> = ({isSelected, children}) => {
  const pinkTag = `<svg width="400" height="59" viewBox="0 0 400 59" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.4 0.4H372.186L399.452 29.5L372.186 58.6H0.4V0.4Z" fill="white" stroke="#D3D3D3" stroke-width="0.8"/>
  <rect width="11.25" height="59" fill="#FF6F61"/>
  </svg>
  `;
  const greyTag = `<svg width="400" height="59" viewBox="0 0 400 59" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.4 0.4H372.186L399.452 29.5L372.186 58.6H0.4V0.4Z" fill="white" stroke="#D3D3D3" stroke-width="0.8"/>
  <rect width="11.25" height="59" fill="#D3D3D3"/>
  </svg>
  `;

  return (
    <Container>
      <Svg height="200">
        <SvgXml xml={isSelected ? pinkTag : greyTag} width="100%" />
      </Svg>
      <WordContainer>
        <Wrapper>{children}</Wrapper>
      </WordContainer>
    </Container>
  );
};

export default NameTag;

const Container = styled.View`
  position: relative;
`;

const WordContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-left: ${wp(20)}px;
  flex-direction: row;
  align-items: center;
`;

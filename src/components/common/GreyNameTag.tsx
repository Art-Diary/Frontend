import React, {ReactNode} from 'react';
import {Svg, SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';

interface TagProps {
  content: string;
  children?: ReactNode;
  login?: boolean;
}

const GreyNameTag: React.FC<TagProps> = ({content, children, login}) => {
  const tag = login
    ? `<svg width="504" height="86" viewBox="0 0 504 86" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.4 0.4H468.724L503.209 43L468.724 85.6H0.4V0.4Z" fill="white" stroke="#D3D3D3" stroke-width="0.8"/>
    <rect width="23.6596" height="86" fill="#D3D3D3"/>
    </svg>    
  `
    : `<svg width="400" height="59" viewBox="0 0 400 59" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.4 0.4H372.186L399.452 29.5L372.186 58.6H0.4V0.4Z" fill="white" stroke="#D3D3D3" stroke-width="0.8"/>
  <rect width="11.25" height="59" fill="#D3D3D3"/>
  </svg>
  `;

  return (
    <Container>
      <Svg height="200">
        <SvgXml xml={tag} width="100%" />
      </Svg>
      <WordContainer>
        <Wrapper>
          {children}
          <TitleText>{content}</TitleText>
        </Wrapper>
      </WordContainer>
    </Container>
  );
};

export default GreyNameTag;

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
  gap: 10px;
`;

const TitleText = styled.Text`
  font-size: ${fp(16)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

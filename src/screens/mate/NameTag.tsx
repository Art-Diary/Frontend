import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {GreyNameTagIcon, MateTagIcon} from '~/components/common/icon';

interface TagProps {
  isSelected?: boolean;
  children: ReactNode;
}

const NameTag: React.FC<TagProps> = ({isSelected, children}) => {
  return (
    <Container>
      {isSelected ? <MateTagIcon /> : <GreyNameTagIcon />}
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
  padding-left: ${wp(5.5)}px;
  flex-direction: row;
  align-items: center;
`;

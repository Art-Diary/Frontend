import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {AREA_FONT_SIZE, FONT_NAME} from './style';
import {BACK_COLOR, MIDDLE_GREY} from './colors';

interface InfoMessageProps {
  message: string;
}

const InfoMessageView: React.FC<InfoMessageProps> = ({message}) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default InfoMessageView;

/** style */
const Container = styled.View`
  flex: 1;
  padding-top: ${hp(1.9)}px;
  align-items: center;
  background-color: ${BACK_COLOR};
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

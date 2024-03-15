import React from 'react';
import styled from 'styled-components/native';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({message}) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default InfoMessage;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

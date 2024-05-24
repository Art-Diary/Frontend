import React from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessageView: React.FC<ErrorMessageProps> = ({message}) => {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
};

export default ErrorMessageView;

/** style */
const Container = styled.View`
  flex: 1;
  padding-top: ${hp(15)}px;
  align-items: center;
  background-color: #f6f6f6;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

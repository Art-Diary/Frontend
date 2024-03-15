import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {fontPercentage as fp} from '~/components/common/ResponsiveSize';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({message}) => {
  return (
    <Container>
      <Message>{message}</Message>
      <ActivityIndicator color={'#FF6F61'} />
    </Container>
  );
};

export default Loading;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
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

import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface LoadingModalProps {
  message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({message}) => {
  return (
    <Modal animationType="fade" transparent={true}>
      <Container>
        <Content>
          <Message>{message}</Message>
          <ActivityIndicator color={'#FF6F61'} />
        </Content>
      </Container>
    </Modal>
  );
};

export default LoadingModal;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Content = styled.View`
  background-color: white;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 20%;
  gap: 5px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

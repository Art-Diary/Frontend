import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

interface LoadingModalProps {
  isLoading: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({isLoading}) => {
  return (
    <Modal visible={isLoading} animationType="fade" transparent={true}>
      <Container>
        <Content>
          <ActivityIndicator color={'#FF6F61'} size="large" />
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
  background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.View`
  justify-content: center;
  align-items: center;
`;

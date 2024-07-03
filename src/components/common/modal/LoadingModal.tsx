import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DEFAULT_TEXT} from '../colors';
import {FONT_NAME} from '../style';

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
  border-radius: ${wp(4.5)}px;
  justify-content: center;
  align-items: center;
  width: ${wp(65)}px;
  height: ${hp(20)}px;
  gap: ${wp(3)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

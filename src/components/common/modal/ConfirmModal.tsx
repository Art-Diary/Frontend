import React, {useEffect} from 'react';
import {Modal, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface ConfirmModalProps {
  message: string;
  onClose: (isClosed: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({message, onClose}) => {
  const displayTime = 800;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(false);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Modal animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={() => onClose(false)}>
        <Container>
          <Contents>
            <Message>{message}</Message>
          </Contents>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmModal;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${hp(36)}px;
`;

const Contents = styled.View`
  background-color: #9e9d9d;
  border-radius: 50px;
  padding: ${hp(7)}px;
  width: 70%;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${fp(17.9)}px;
  color: white;
  font-family: 'omyu pretty';
  padding-top: ${hp(3)}px;
  padding-bottom: ${hp(3)}px;
`;

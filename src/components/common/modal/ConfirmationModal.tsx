import React, {ReactNode} from 'react';
import {Modal, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {heightPercentage as hp} from '~/components/common/ResponsiveSize';

interface ConfirmationModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  handleCloseModal,
  children,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => handleCloseModal()}>
      <Pressable
        style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
        onPress={() => handleCloseModal()}
      />
      <Container>
        <Contents>{children}</Contents>
      </Container>
    </Modal>
  );
};

export default ConfirmationModal;

/** style */
const Container = styled.View`
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Contents = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${hp(14)}px;
  width: 100%;
`;

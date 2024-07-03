import React, {ReactNode} from 'react';
import {Modal, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';

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
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Contents = styled.View`
  background-color: white;
  border-top-left-radius: ${wp(5)}px;
  border-top-right-radius: ${wp(5)}px;
  padding: ${hp(2.4)}px;
  width: 100%;
`;

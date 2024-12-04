import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {BACK_COLOR} from '~/components/common/colors';
import {Modal} from 'react-native';

interface ModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const DecisionModal: React.FC<ModalProps> = ({handleCloseModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={handleCloseModal}>
      <Backdrop onPress={handleCloseModal}>
        <Container>
          <Contents onStartShouldSetResponder={() => true}>{children}</Contents>
        </Container>
      </Backdrop>
    </Modal>
  );
};

export default DecisionModal;

/** style */
const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: ${wp(2.4)}px;
`;

const Contents = styled.View`
  background-color: ${BACK_COLOR};
  border-radius: ${wp(7)}px;
  width: 100%;
  height: 34%;
`;

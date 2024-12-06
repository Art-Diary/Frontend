import React, {ReactNode} from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {BACK_COLOR} from '../colors';

interface InfoModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({handleCloseModal, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => handleCloseModal()}>
      <Backdrop onPress={handleCloseModal}>
        {/* 컨텐츠 영역 */}
        <Container>
          <Contents onStartShouldSetResponder={() => true}>{children}</Contents>
        </Container>
      </Backdrop>
    </Modal>
  );
};

export default InfoModal;

/** style */
const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const Contents = styled.View`
  background-color: ${BACK_COLOR};
  border-top-left-radius: ${wp(5)}px;
  border-top-right-radius: ${wp(5)}px;
  padding: ${hp(2.4)}px;
  width: 100%;
  height: 74%;
`;

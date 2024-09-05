import React from 'react';
import styled from 'styled-components/native';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../common/style';
import {DEFAULT_TEXT, MAIN_COLOR} from '../common/colors';
import CustomTouchable from '../common/CustomTouchable';

interface OptionsModalProps {
  handleCloseModal: () => void;
  message: string;
  // tkey: string | null;
  onPressYes: () => void;
  onPressNo: () => void;
  yes: string;
  no: string;
}

const RegExhOptionsModal: React.FC<OptionsModalProps> = ({
  handleCloseModal,
  message,
  onPressYes,
  onPressNo,
  yes,
  no,
}) => {
  return (
    <ConfirmationModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      <ButtonSection>
        <ButtonDetailSection>
          <CustomTouchable onPress={onPressYes}>
            <DeleteButton> {yes} </DeleteButton>
          </CustomTouchable>
        </ButtonDetailSection>
        <ButtonDetailSection>
          <CustomTouchable onPress={onPressNo}>
            <DeleteButton>{no}</DeleteButton>
          </CustomTouchable>
        </ButtonDetailSection>
      </ButtonSection>
    </ConfirmationModal>
  );
};

export default RegExhOptionsModal;

/** style */
const Message = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-top: ${hp(8)}px;
  padding-bottom: ${hp(8)}px;
`;

const ButtonSection = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ButtonDetailSection = styled.View`
  padding-left: ${wp(2)}px;
  padding-right: ${wp(2)}px;
  padding-bottom: ${wp(2)}px;
  width: 50%;
`;

const DeleteButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

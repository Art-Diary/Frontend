import React from 'react';
import styled from 'styled-components/native';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '../common/style';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '../common/colors';
import CustomTouchable from '../common/CustomTouchable';
import DecisionModal from '../common/modal/DecisionModal';

interface OptionsModalProps {
  option: 'UPDATE' | 'DELETE';
  handleCloseModal: () => void;
  onPressYes: () => void;
}

const RegExhOptionsModal: React.FC<OptionsModalProps> = ({
  option,
  handleCloseModal,
  onPressYes,
}) => {
  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <Contents>
        <MsgWrapper>
          <Message>
            {option === 'UPDATE'
              ? '등록한 전시회 정보를 수정할까요?'
              : '등록한 전시회 정보를 삭제할까요?'}
          </Message>
          {option === 'DELETE' && (
            <MessageSub>삭제하면 복구할 수 없습니다.</MessageSub>
          )}
        </MsgWrapper>
        <ButtonSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={handleCloseModal}>
              <ButtonText>닫기</ButtonText>
            </CustomTouchable>
          </ButtonDetailSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={onPressYes}>
              <ButtonText isMain>
                {option === 'UPDATE' ? '수정' : '삭제'}
              </ButtonText>
            </CustomTouchable>
          </ButtonDetailSection>
        </ButtonSection>
      </Contents>
    </DecisionModal>
  );
};

export default RegExhOptionsModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${hp(2)}px;
  padding-bottom: ${hp(2.5)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const MsgWrapper = styled.View`
  flex: 1px;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${hp(1.3)}px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: ${rf(18.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${rf(14.5)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const ButtonSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonDetailSection = styled.View`
  width: 49%;
`;

interface ButtonTextProps {
  isMain: string;
}

const ButtonText = styled.Text<ButtonTextProps>`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonTextProps) =>
    props.isMain ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

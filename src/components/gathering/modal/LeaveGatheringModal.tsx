import React from 'react';
import styled from 'styled-components/native';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {
  DARK_GREY,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';
import DecisionModal from '~/components/common/modal/DecisionModal';

interface DeleteDiaryModalProps {
  handleCloseModal: () => void;
  handleLeave: () => void;
}

const LeaveGatheringModal: React.FC<DeleteDiaryModalProps> = ({
  handleCloseModal,
  handleLeave,
}) => {
  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <Contents>
        <MsgWrapper>
          <Message>모임을 나가겠습니까?</Message>
          <MessageSub>나가면 초대받기 전까지 입장할 수 없습니다.</MessageSub>
        </MsgWrapper>
        <ButtonSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={handleCloseModal}>
              <LeaveButton>닫기</LeaveButton>
            </CustomTouchable>
          </ButtonDetailSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={handleLeave}>
              <LeaveButton isMain>나가기</LeaveButton>
            </CustomTouchable>
          </ButtonDetailSection>
        </ButtonSection>
      </Contents>
    </DecisionModal>
  );
};

export default LeaveGatheringModal;

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
  color: ${DARK_GREY};
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

const LeaveButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonTextProps) =>
    props.isMain ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

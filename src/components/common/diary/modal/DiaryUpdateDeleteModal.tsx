import React from 'react';
import styled from 'styled-components/native';
import {
  widthSizePercentage as wp,
  heightSizePercentage as hp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME} from '~/components/common/style';
import {BORDER_COLOR, DARK_GREY, MIDDLE_GREY} from '~/components/common/colors';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  CloseButtonIcon,
  PencilUpdateIcon,
  TrashDeleteIcon,
} from '~/components/common/icon';
import DecisionModal from '../../modal/DecisionModal';

interface ModalProps {
  handleCloseModal: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const DiaryUpdateDeleteModal: React.FC<ModalProps> = ({
  handleCloseModal,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <Contents>
        <CustomTouchable onPress={handleDelete}>
          <ItemView>
            <TrashDeleteIcon />
            <MsgWrapper>
              <Message>삭제</Message>
              <MessageSub>기록 삭제</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
        <SeperateLine />
        <CustomTouchable onPress={handleUpdate}>
          <ItemView>
            <PencilUpdateIcon />
            <MsgWrapper>
              <Message>수정</Message>
              <MessageSub>기록 수정</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
        <SeperateLine />
        <CustomTouchable onPress={handleCloseModal}>
          <ItemView>
            <CloseButtonIcon />
            <MsgWrapper>
              <Message>닫기</Message>
              <MessageSub>창 닫기</MessageSub>
            </MsgWrapper>
          </ItemView>
        </CustomTouchable>
      </Contents>
    </DecisionModal>
  );
};

export default DiaryUpdateDeleteModal;

/** style */
const Contents = styled.View`
  flex: 1px;
  justify-content: space-between;
  padding-top: ${hp(4)}px;
  padding-bottom: ${hp(3.4)}px;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const ItemView = styled.View`
  flex-direction: row;
  width: 100%;
  padding-left: ${wp(6)}px;
  gap: ${wp(6)}px;
  align-items: center;
`;

const MsgWrapper = styled.View`
  flex-direction: column;
  width: 100%;
`;

const Message = styled.Text`
  font-size: ${rf(18)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MessageSub = styled.Text`
  font-size: ${rf(13)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const SeperateLine = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: ${wp(0.05)}px;
  border-color: ${BORDER_COLOR};
`;

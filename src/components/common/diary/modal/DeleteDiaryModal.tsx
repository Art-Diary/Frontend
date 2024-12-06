import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {
  heightSizePercentage as hp,
  widthSizePercentage as wp,
  responseFont as rf,
} from '~/components/common/ResponsiveSize';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  DEFAULT_TEXT,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import CustomTouchable from '~/components/common/CustomTouchable';
import DecisionModal from '../../modal/DecisionModal';

type DeleteInfo = {
  exhId: number;
  diaryId: number;
};

interface DeleteDiaryModalProps {
  deleteInfo: DeleteInfo;
  handleCloseModal: () => void;
  handleSuccessDelete: () => void;
}

const DeleteDiaryModal: React.FC<DeleteDiaryModalProps> = ({
  deleteInfo,
  handleCloseModal,
  handleSuccessDelete,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {
    mutate: deleteMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteMyDiary(deleteInfo.exhId, deleteInfo.diaryId);

  useEffect(() => {
    if (isError) {
      handleCloseModal();
      showToast('에러 발생 ;(');
    }
    if (isSuccess) {
      handleCloseModal();
      showToast('기록을 삭제했습니다.');
      handleSuccessDelete();
      if (
        tabIdentifierInfo.tab === 'exhibition' ||
        tabIdentifierInfo.tab === 'exhibitionMoreReview'
      ) {
        navigation.goBack();
      }
    }
  }, [isError, isSuccess, handleCloseModal]);

  return (
    <DecisionModal handleCloseModal={handleCloseModal}>
      <Contents>
        <MsgWrapper>
          <Message>기록을 삭제하겠습니까?</Message>
          <MessageSub>삭제하면 복구할 수 없습니다.</MessageSub>
        </MsgWrapper>
        <CustomTouchable onPress={() => deleteMyDiary()}>
          <DeleteButton>삭제</DeleteButton>
        </CustomTouchable>
      </Contents>
    </DecisionModal>
  );
};

export default DeleteDiaryModal;

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

const DeleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${MAIN_COLOR};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

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
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import CustomTouchable from '~/components/common/CustomTouchable';
import DecisionModal from '../../modal/DecisionModal';
import LoadingModal from '../../modal/LoadingModal';

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
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const tabIdentifierInfo = useTabIdentifierInfo();

  // API Hooks
  const {
    mutate: deleteMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteMyDiary(deleteInfo.exhId, deleteInfo.diaryId);

  useEffect(() => {
    if (isError) {
      handleCloseModal();
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      handleCloseModal();
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
      <LoadingModal isLoading={isLoading} />
      <Contents>
        <MsgWrapper>
          <Message>기록을 삭제하겠습니까?</Message>
          <MessageSub>삭제하면 복구할 수 없습니다.</MessageSub>
        </MsgWrapper>
        <ButtonSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={handleCloseModal}>
              <DeleteButton>닫기</DeleteButton>
            </CustomTouchable>
          </ButtonDetailSection>
          <ButtonDetailSection>
            <CustomTouchable onPress={() => deleteMyDiary()}>
              <DeleteButton isMain>삭제</DeleteButton>
            </CustomTouchable>
          </ButtonDetailSection>
        </ButtonSection>
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

const DeleteButton = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: white;
  background-color: ${(props: ButtonTextProps) =>
    props.isMain ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

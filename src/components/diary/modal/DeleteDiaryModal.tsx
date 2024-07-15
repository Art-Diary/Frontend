import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {heightSizePercentage as hp} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {DEFAULT_TEXT, MAIN_COLOR} from '~/components/common/colors';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

type DeleteInfo = {
  exhId: number;
  diaryId: number;
};

interface DeleteDiaryModalProps {
  deleteInfo: DeleteInfo;
  handleCloseModal: () => void;
  message: string;
  handleSuccessDelete: () => void;
}

const DeleteDiaryModal: React.FC<DeleteDiaryModalProps> = ({
  deleteInfo,
  handleCloseModal,
  message,
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
      if (tabIdentifierInfo.tab === 'exhibition') {
        navigation.goBack();
      }
    }
  }, [isError, isSuccess, handleCloseModal]);

  return (
    <ConfirmationModal handleCloseModal={handleCloseModal}>
      <Message>{message}</Message>
      <TouchableOpacity onPress={() => deleteMyDiary()}>
        <DeleteButton>삭제</DeleteButton>
      </TouchableOpacity>
    </ConfirmationModal>
  );
};

export default DeleteDiaryModal;

/** style */
const Message = styled.Text`
  text-align: center;
  font-size: ${BUTTON_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding: ${hp(8)}px;
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

import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {
  useDeleteMyDiaryActions,
  useDeleteMyDiaryInfo,
} from '~/zustand/mydiary/mydiary';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import ConfirmationModal from '~/components/common/modal/ConfirmationModal';
import {showToast} from '~/components/common/modal/toastConfig';

interface DeleteDiaryModalProps {
  handleCloseModal: () => void;
  message: string;
  handleIsDeleted: () => void;
}

const DeleteDiaryModal: React.FC<DeleteDiaryModalProps> = ({
  handleCloseModal,
  message,
  handleIsDeleted,
}) => {
  const deletemyDiaryInfo = useDeleteMyDiaryInfo();
  const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();
  const {
    mutate: deleteMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteMyDiary(
    deletemyDiaryInfo.exhId,
    deletemyDiaryInfo.diaryId,
    deletemyDiaryInfo.userExhId ? true : false, // 모임 or 혼자
  );

  useEffect(() => {
    if (isError) {
      handleCloseModal();
      showToast('에러 발생 ;(');
    }
    if (isSuccess) {
      updateforDeleteMyDiary(-1, -1, -1);
      handleCloseModal();
      showToast('기록을 삭제했습니다.');
      handleIsDeleted();
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
  font-size: ${fp(17.9)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(45)}px;
  padding-bottom: ${hp(45)}px;
`;

const DeleteButton = styled.Text`
  text-align: center;
  margin-top: ${hp(14)}px;
  font-size: ${fp(17.9)}px;
  font-family: 'omyu pretty';
  color: white;
  background-color: #ff6f61;
  padding-top: ${hp(9.5)}px;
  padding-bottom: ${hp(9.5)}px;
  border-radius: 5px;
`;

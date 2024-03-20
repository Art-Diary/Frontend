import React, {useEffect} from 'react';
import {TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
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

interface DeleteModalProps {
  handleCloseModal: (state: number) => void;
  message: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  handleCloseModal,
  message,
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
    deletemyDiaryInfo.userExhId === null ? false : true, // 모임 or 혼자
  );

  useEffect(() => {
    if (isError) {
      handleCloseModal(2);
    }
    if (isSuccess) {
      updateforDeleteMyDiary(-1, -1, -1);
      handleCloseModal(1);
    }
  }, [isError, isSuccess, handleCloseModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => handleCloseModal(3)}>
      <TouchableWithoutFeedback onPress={() => handleCloseModal(3)}>
        <Container>
          <Contents>
            <Message>{message}</Message>
            <TouchableOpacity onPress={() => deleteMyDiary()}>
              <DeleteButton>삭제</DeleteButton>
            </TouchableOpacity>
          </Contents>
        </Container>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteModal;

/** style */
const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Contents = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${hp(14)}px;
  width: 100%;
`;

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

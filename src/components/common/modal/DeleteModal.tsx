import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {useMyDiaryExhId, useMyDiaryInfo} from '~/zustand/mydiary/mydiary';

interface DeleteModalProps {
  handleCloseModal: (state: number) => void;
  message: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  handleCloseModal,
  message,
}) => {
  const myDiaryExhId = useMyDiaryExhId();
  const myDiaryInfo = useMyDiaryInfo();
  const {
    mutate: deleteMyDiary,
    isLoading,
    isError,
    isSuccess,
  } = useDeleteMyDiary(
    myDiaryExhId,
    myDiaryInfo.diaryId,
    myDiaryInfo.userExhId === null ? false : true, // 모임 or 혼자
  );

  useEffect(() => {
    if (isError) {
      handleCloseModal(2);
    }
    if (isSuccess) {
      handleCloseModal(1);
    }
  }, [isError, isSuccess, handleCloseModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => handleCloseModal(3)}>
      <TouchableWithoutFeedback onPress={() => handleCloseModal(3)}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.message}>{message}</Text>
            <TouchableOpacity onPress={() => deleteMyDiary()}>
              <Text style={modalStyles.closeText}>삭제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteModal;

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
  },
  message: {
    fontSize: 20,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
    textAlign: 'center',
    paddingVertical: 63,
  },
  closeText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'omyu pretty',
    color: 'white',
    backgroundColor: '#FF6F61',
    paddingVertical: 13,
    borderRadius: 5,
  },
});

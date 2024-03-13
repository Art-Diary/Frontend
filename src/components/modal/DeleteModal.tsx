import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDeleteMyDiary} from '~/api/queries/mydiary';
import {
  useMyDiaryExhId,
  useMyDiaryId,
  useMyDiaryIsSolo,
} from '~/zustand/mydiary/mydiary';

interface DeleteModalProps {
  message: string;
  onClose: (isDeleted: number) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({onClose, message}) => {
  const myDiaryExhId = useMyDiaryExhId();
  const myDiaryId = useMyDiaryId();
  const myDiaryIsSolo = useMyDiaryIsSolo();
  const {mutate, isLoading, isError, isSuccess} = useDeleteMyDiary(
    myDiaryExhId,
    myDiaryId,
    myDiaryIsSolo,
  );

  if (isError) {
    onClose(2);
  }

  if (isSuccess) {
    onClose(1);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => onClose(3)}>
      <TouchableWithoutFeedback onPress={() => onClose(3)}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.message}>{message}</Text>
            <TouchableOpacity onPress={() => mutate()}>
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

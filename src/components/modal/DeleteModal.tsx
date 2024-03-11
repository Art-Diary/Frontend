import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

interface DeleteModalProps {
  message: string;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({onClose, message}) => {
  return (
    <Modal animationType="fade" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.message}>{message}</Text>
            <TouchableOpacity onPress={onClose}>
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
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#FF6F61',
    paddingVertical: 10,
    borderRadius: 5,
  },
});

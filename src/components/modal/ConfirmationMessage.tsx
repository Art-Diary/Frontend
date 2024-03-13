import React, {useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const ConfirmationMessage = ({message, onClose}) => {
  const displayTime = 600;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(false);
    }, displayTime);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Modal animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={() => onClose(false)}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.message}>{message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationMessage;

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  modalContent: {
    backgroundColor: '#545454',
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    width: '70%',
  },
  message: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'omyu pretty',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import DeleteModal from '../common/modal/DeleteModal';
import ConfirmModal from '../common/modal/ConfirmModal';

interface TitleProps {
  diaryId: number;
  title: string;
}

const TitleInfo: React.FC<TitleProps> = ({diaryId, title}) => {
  const [isDeletePressed, setIsDeletePressed] = useState<boolean>(false);
  const [getDeleteMessage, setGetDeleteMessage] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>('');

  const deleteModalOpen = (diaryId: number, solo: boolean) => {
    console.log('[MyDiaryDeleteModal] Opening my diary delete modal');
    // updateDiaryId(diaryId);
    setIsDeletePressed(true);
  };

  const deleteModalClose = (isDeleted: number) => {
    setIsDeletePressed(false);
    if (isDeleted === 1) {
      setDeleteMessage('기록을 삭제했습니다.');
      setGetDeleteMessage(true);
    } else if (isDeleted === 2) {
      setDeleteMessage('에러 발생 ;(');
      setGetDeleteMessage(true);
    }
  };

  return (
    <View style={contentStyles.view}>
      {/* 기록 제목 */}
      <Text style={contentStyles.titleText}>{title}</Text>
      {/* 수정 | 삭제 */}
      <View style={{flexDirection: 'row', gap: 4}}>
        <TouchableOpacity>
          <Text style={contentStyles.eventText}>수정</Text>
        </TouchableOpacity>
        <Text style={contentStyles.eventText}>|</Text>
        <TouchableOpacity onPress={() => deleteModalOpen(diaryId, true)}>
          <Text style={contentStyles.eventText}>삭제</Text>
          {isDeletePressed && (
            <DeleteModal
              handleCloseModal={deleteModalClose}
              message="기록을 삭제하겠습니까?"
            />
          )}
          {getDeleteMessage && (
            <ConfirmModal
              message={deleteMessage}
              onClose={setGetDeleteMessage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TitleInfo;

/** style */
const contentStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 28,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  eventText: {
    fontSize: 17,
    color: '#979797',
    fontFamily: 'omyu pretty',
  },
});

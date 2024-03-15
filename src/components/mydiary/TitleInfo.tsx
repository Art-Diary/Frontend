import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import DeleteModal from '../common/modal/DeleteModal';
import ConfirmModal from '../common/modal/ConfirmModal';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

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
    <Container>
      {/* 기록 제목 */}
      <TitleText>{title}</TitleText>
      {/* 수정 | 삭제 */}
      <EventView>
        <TouchableOpacity>
          <EventText>수정</EventText>
        </TouchableOpacity>
        <EventText>|</EventText>
        <TouchableOpacity onPress={() => deleteModalOpen(diaryId, true)}>
          <EventText>삭제</EventText>
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
      </EventView>
    </Container>
  );
};

export default TitleInfo;

/** style */
const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: ${fp(25.8)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const EventView = styled.View`
  flex-direction: row;
  gap: ${wp(3.7)}px;
`;

const EventText = styled.Text`
  font-size: ${fp(15)}px;
  color: #979797;
  font-family: 'omyu pretty';
`;

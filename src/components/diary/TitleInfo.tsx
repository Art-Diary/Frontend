import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import DeleteModal from '../common/modal/DeleteModal';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {
  useDeleteMyDiaryActions,
  useMyExhIdInfo,
} from '~/zustand/mydiary/mydiary';
import {showToast} from '../common/modal/toastConfig';

interface TitleProps {
  diaryId: number;
  title: string;
  userExhId: number;
}

const TitleInfo: React.FC<TitleProps> = ({diaryId, title, userExhId}) => {
  const [isDeletePressed, setIsDeletePressed] = useState<boolean>(false);
  const myExhId = useMyExhIdInfo();
  const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();

  const deleteModalOpen = (diaryId: number, userExhId: number) => {
    console.log('[MyDiaryDeleteModal] Opening my diary delete modal');
    // updateDiaryId(diaryId);
    updateforDeleteMyDiary(myExhId, diaryId, userExhId);
    setIsDeletePressed(true);
  };

  const deleteModalClose = (isDeleted: number) => {
    setIsDeletePressed(false);
    if (isDeleted === 1) {
      showToast('기록을 삭제했습니다.');
    } else if (isDeleted === 2) {
      showToast('에러 발생 ;(');
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
        <TouchableOpacity onPress={() => deleteModalOpen(diaryId, userExhId)}>
          <EventText>삭제</EventText>
          {isDeletePressed && (
            <DeleteModal
              handleCloseModal={deleteModalClose}
              message="기록을 삭제하겠습니까?"
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

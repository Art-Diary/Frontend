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
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMySoloActions} from '~/zustand/mydiary/mySoloStoredDates';

interface TitleProps {
  diaryInfo: any;
}

const TitleInfo: React.FC<TitleProps> = ({diaryInfo}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isDeletePressed, setIsDeletePressed] = useState<boolean>(false);
  const myExhId = useMyExhIdInfo();
  const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();
  const {updateIsUpdate, updateforIds, updateforDetailInfo, updateforContent} =
    useWriteMyDiaryActions();
  const {updateSoloExhId} = useMySoloActions();

  const deleteModalOpen = () => {
    console.log('[MyDiaryDeleteModal] Opening my diary delete modal');
    // updateDiaryId(diaryId);
    updateforDeleteMyDiary(myExhId, diaryInfo.diaryId, diaryInfo.userExhId);
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

  const onPressUpdate = () => {
    updateIsUpdate(true);
    updateforIds(
      diaryInfo.diaryId ? diaryInfo.diaryId : null,
      diaryInfo.userExhId ?? -1,
      diaryInfo.gatheringExhId ?? -1,
    );
    updateforDetailInfo(
      diaryInfo.title,
      diaryInfo.rate,
      diaryInfo.diaryPrivate,
      diaryInfo.thumbnail,
      diaryInfo.writeDate,
      diaryInfo.saying,
    );
    updateforContent(diaryInfo.contents);
    updateSoloExhId(myExhId);
    navigation.navigate('AddMyVisitDateRoutes');
  };

  return (
    <Container>
      {/* 기록 제목 */}
      <TitleText>{diaryInfo.title}</TitleText>
      {/* 수정 | 삭제 */}
      <EventView>
        <TouchableOpacity onPress={onPressUpdate}>
          <EventText>수정</EventText>
        </TouchableOpacity>
        <EventText>|</EventText>
        <TouchableOpacity onPress={deleteModalOpen}>
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

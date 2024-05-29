import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {
  useDeleteMyDiaryActions,
  useVisitedExhIdInfo,
} from '~/zustand/mydiary/mydiary';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import DeleteDiaryModal from './modal/DeleteDiaryModal';
import {useTabIdentifierInfo} from '~/zustand/tabIdentifier';

interface TitleProps {
  diaryInfo: any;
  handleIsDeleted: () => void;
}

const UpdateDelete: React.FC<TitleProps> = ({diaryInfo, handleIsDeleted}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isDeletePressed, setIsDeletePressed] = useState<boolean>(false);
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {updateforDeleteMyDiary} = useDeleteMyDiaryActions();
  const {
    updateIsUpdate,
    updateforIds,
    updateforDetailInfo,
    updateforContent,
    updateInGathering,
  } = useWriteMyDiaryActions();
  const tabIdentifier = useTabIdentifierInfo();

  const deleteModalOpen = () => {
    console.log('[MyDiaryDeleteModal] Opening my diary delete modal');
    updateforDeleteMyDiary(
      visitedExhId,
      diaryInfo.diaryId,
      diaryInfo.userExhId,
    );
    setIsDeletePressed(true);
  };

  const deleteModalClose = () => {
    setIsDeletePressed(false);
  };

  const onPressUpdate = () => {
    updateIsUpdate(true);
    updateforIds(
      diaryInfo.diaryId ? diaryInfo.diaryId : null,
      diaryInfo.userExhId ?? -1,
      diaryInfo.gatherExhId ?? -1,
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
    updateInGathering(false, null);
    if (tabIdentifier.tab === 'mydiary' || tabIdentifier.tab === 'gathering') {
      navigation.navigate('AddMyVisitDateRoutes');
    } else {
      navigation.navigate('WriteMyDiaryRoutes');
    }
  };

  return (
    <EventView>
      {/* 수정 | 삭제 */}
      <TouchableOpacity onPress={onPressUpdate}>
        <EventText>수정</EventText>
      </TouchableOpacity>
      <EventText>|</EventText>
      <TouchableOpacity onPress={deleteModalOpen}>
        <EventText>삭제</EventText>
        {isDeletePressed && (
          <DeleteDiaryModal
            handleCloseModal={deleteModalClose}
            message="기록을 삭제하겠습니까?"
            handleIsDeleted={handleIsDeleted}
          />
        )}
      </TouchableOpacity>
    </EventView>
  );
};

export default UpdateDelete;

/** style */
const EventView = styled.View`
  flex-direction: row;
  gap: ${wp(3.7)}px;
`;

const EventText = styled.Text`
  font-size: ${fp(15)}px;
  color: #979797;
  font-family: 'omyu pretty';
  padding: ${wp(2)}px;
`;

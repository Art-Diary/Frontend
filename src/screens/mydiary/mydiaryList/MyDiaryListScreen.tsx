import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import DiaryList from '../../../components/diary/DiaryList';
import {WriteDiaryButton} from '~/assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import {useFetchMyDiaryList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';

const MyDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();
  const {
    data: myDiaryList,
    isLoading,
    isError,
  } = useFetchMyDiaryList(visitedExhId);

  if (isError) {
    return <ErrorMessageView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />;
  }

  if (myDiaryList.length === 0) {
    return (
      <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />
    );
  }

  const onPressButton = () => {
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('AddMyVisitDateRoutes');
  };

  return (
    <Container>
      {/* header */}
      <BackView line={false}>
        <TouchableOpacity onPress={onPressButton}>
          <WriteDiaryButton />
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <DiaryList diaryList={myDiaryList} />
    </Container>
  );
};

export default MyDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  align-items: center;
  width: 100%;
`;

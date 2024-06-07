import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchGatheringDiaryList} from '~/api/queries/gathering';
import {WriteDiaryButton} from '~/assets/images';
import BackView from '~/components/common/BackView';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';
import {useGatheringListParamsInfo} from '~/zustand/gathering/gathering';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';

const GatheringDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {params} = useGatheringListParamsInfo();
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();
  const {
    data: gatheringDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchGatheringDiaryList(params.gatherId, params.exhId);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return <ErrorMessageView message="전시 메이트 다이어리 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시 메이트 다이어리 조회 중:)" />;
  }

  const onPressButton = () => {
    updateIsUpdate(false);
    updateInGathering(true, params.gatherId);
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
      {gatheringDiaryList.length === 0 ? (
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList diaryList={gatheringDiaryList} />
      )}
    </Container>
  );
};

export default GatheringDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

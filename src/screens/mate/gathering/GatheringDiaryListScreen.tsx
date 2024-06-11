import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {WriteDiaryButton} from '~/assets/images';
import BackView from '~/components/common/BackView';
import {useGatheringListParamsInfo} from '~/zustand/gathering/gathering';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import FetchGatheringDiaryList from './FetchGatheringDiaryList';

const GatheringDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {params} = useGatheringListParamsInfo();
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();

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
      <FetchGatheringDiaryList
        fetchInfo={{gatherId: params.gatherId, exhId: params.exhId}}
      />
    </Container>
  );
};

export default GatheringDiaryListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

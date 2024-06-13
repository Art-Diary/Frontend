import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import {WriteDiaryButton} from '~/assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import MyDiaryList from './MyDiaryList';

const MyDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateIsUpdate, updateInGathering} = useWriteMyDiaryActions();

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
      <MyDiaryList />
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

import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import BackView from '~/components/common/BackView';
import DiaryList from '../../../components/diary/DiaryList';
import {WriteDiaryButton} from '~/assets/images/index';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

const MyDiaryListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressButton = () => {
    navigation.navigate('ChooseVisitDate');
  };

  return (
    <Container>
      {/* header */}
      <BackView>
        <TouchableOpacity onPress={onPressButton}>
          <WriteDiaryButton />
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <DiaryList />
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

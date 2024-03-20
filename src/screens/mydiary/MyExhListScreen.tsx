import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Header from '~/components/common/Header';
import {RootStackNavigationProp} from '~/App';
import StoredExhList from '../../components/diary/StoredExhList';
import {AddMyExhButton} from '~/assets/images/index';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Container>
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyAddExhibition')}>
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <Contents>
        <StoredExhList />
      </Contents>
    </Container>
  );
};

export default MyExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
`;

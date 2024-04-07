import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Header from '~/components/common/Header';
import {RootStackNavigationProp} from '~/App';
import {AddMyExhButton} from '~/assets/images/index';
import MyExhList from './MyExhList';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Container>
      {/* <RefreshControl onRefresh={refresh} refreshing={isRefreshing} /> */}
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyExhibitionSearch')}>
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <MyExhList />
    </Container>
  );
};

export default MyExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '~/components/common/Header';
import {RootStackNavigationProp} from '~/App';
import MyExhList from './MyExhList';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {AddMyExhButtonIcon} from '~/components/common/icon';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'mydiary') {
        updateTab('mydiary');
      }
    }
  }, [isFocused]);

  return (
    <Container>
      {/* <RefreshControl onRefresh={refresh} refreshing={isRefreshing} /> */}
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyExhibitionSearch')}>
          <AddMyExhButtonIcon />
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

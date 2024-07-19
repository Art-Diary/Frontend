import React, {useEffect} from 'react';
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
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';
import CustomTouchable from '~/components/common/CustomTouchable';

const MyExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'mydiary') {
        updateTab('mydiary');
        updateDate(null);
      }
    }
  }, [isFocused]);

  return (
    <Container>
      {/* <RefreshControl onRefresh={refresh} refreshing={isRefreshing} /> */}
      {/* header */}
      <Header title={'내 기록'}>
        <CustomTouchable
          onPress={() => navigation.navigate('MyExhibitionSearch')}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
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

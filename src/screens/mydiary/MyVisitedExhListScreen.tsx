import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '~/components/common/Header';
import {RootStackNavigationProp} from '~/App';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {AddMyExhButtonIcon} from '~/components/common/icon';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';
import CustomTouchable from '~/components/common/CustomTouchable';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';
import MyVisitedExhList from '~/components/mydiary/MyVisitedExhList';

const MyVisitedExhListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions();
  const {updateIsUpdate, updateInGathering, resetWriteInfo} =
    useWriteMyDiaryActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'mydiary') {
        updateTab('mydiary');
        updateDate(null);
      }
    }
  }, [isFocused]);

  const onPressAddButtom = () => {
    resetWriteInfo();
    updateIsUpdate(false);
    updateInGathering(false, null);
    navigation.navigate('CreateExhVisitedDate', {exhId: undefined});
  };

  return (
    <Container>
      {/* <RefreshControl onRefresh={refresh} refreshing={isRefreshing} /> */}
      {/* header */}
      <Header title={'내 기록'}>
        {/* noLine isMain */}
        <CustomTouchable onPress={onPressAddButtom}>
          <AddMyExhButtonIcon />
        </CustomTouchable>
      </Header>

      {/* body */}
      <MyVisitedExhList />
    </Container>
  );
};

export default MyVisitedExhListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import VisitedExhListFrame from '~/components/diary/VisitedExhListFrame';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {BACK_COLOR} from '~/components/common/colors';

const MyExhList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const {data: myExhList, isLoading, isError, refetch} = useFetchMyExhList();

  if (isError) {
    return (
      <ErrorMessageView message={'기록이 있는 전시회 목록 조회 실패 ;('} />
    );
  }

  if (isLoading) {
    return <LoadingModal message={'기록이 있는 전시회 목록 조회 중 :)'} />;
  }

  if (myExhList.length === 0) {
    return <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다'} />;
  }

  const onPress = (exhId: number) => {
    updateVisitedExhId(exhId);
    navigation.navigate('MyDiaryRoutes', {
      screen: 'MyDiaryList',
      params: {pageNum: 0},
    });
  };

  return (
    <Contents>
      {/* body */}
      <VisitedExhListFrame exhList={myExhList} handlePressExh={onPress} />
    </Contents>
  );
};

export default MyExhList;

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
`;

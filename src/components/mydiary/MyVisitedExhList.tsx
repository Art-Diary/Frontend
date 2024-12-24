import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import InfoMessageView from '~/components/common/InfoMessageView';
import {RootStackNavigationProp} from '~/App';
import {useVisitedExhIdActions} from '~/zustand/mydiary/mydiary';
import {BACK_COLOR} from '~/components/common/colors';
import VisitedExhListFrame from './VisitedExhListFrame';
import LoadingModal from '../common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

const MyVisitedExhList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateVisitedExhId} = useVisitedExhIdActions();
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const {data: myExhList, isLoading, isError, refetch} = useFetchMyExhList();

  const onPress = (exhId: number) => {
    updateVisitedExhId(exhId);
    navigation.navigate('MyDiaryRoutes', {
      screen: 'MyDiaryList',
      params: {pageNum: 0},
    });
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Contents>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {/* body */}
      {myExhList &&
        (myExhList.length > 0 ? (
          <VisitedExhListFrame exhList={myExhList} handlePressExh={onPress} />
        ) : (
          <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
        ))}
    </Contents>
  );
};

export default MyVisitedExhList;

/** style */
const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
`;

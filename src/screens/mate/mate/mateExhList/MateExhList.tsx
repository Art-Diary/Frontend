import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RootStackNavigationProp} from '~/App';
import InfoMessageView from '~/components/common/InfoMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useFetchMateExhList} from '~/api/queries/mate';
import {useMateInfo} from '~/zustand/mate/mate';
import VisitedExhListFrame from '~/components/mydiary/VisitedExhListFrame';
import {useQueryMateDiaryActions} from '~/zustand/mate/queryMateDiary';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {BACK_COLOR} from '~/components/common/colors';
import ErrorModal from '~/components/common/modal/ErrorModal';

const MateExhList = () => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const mateInfo = useMateInfo();
  const {updateQueryInfo} = useQueryMateDiaryActions();

  // State Management
  const [refreshing, setRefreshing] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: mateExhList,
    isLoading,
    isError,
    refetch,
  } = useFetchMateExhList(mateInfo.mateInfo.userId);

  // Effects
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  // Handlers
  const onPress = (exhId: number) => {
    updateQueryInfo({
      mateId: mateInfo.mateInfo.userId,
      exhId: exhId,
    });
    navigation.navigate('MateDiaryList');
  };

  const handleRefetch = async () => {
    await refetch().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <RefreshView
        data={['']}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({}) => (
          <>
            {mateExhList &&
              (!mateExhList.length ? (
                <InfoMessageView
                  message={'아직 전시 메이트의 전시회에 대한 기록이 없습니다.'}
                />
              ) : (
                <VisitedExhListFrame
                  exhList={mateExhList}
                  handlePressExh={onPress}
                />
              ))}
          </>
        )}
      />
    </>
  );
};

export default MateExhList;

const RefreshView = styled.FlatList`
  background-color: ${BACK_COLOR};
`;

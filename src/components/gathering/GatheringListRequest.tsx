import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RootStackNavigationProp} from '~/App';
import NameList from '~/components/mate/NameList';
import {useFetchGatheringList} from '~/api/queries/gathering';
import InfoMessageView from '~/components/common/InfoMessageView';
import {useEnterGatheringActions} from '~/zustand/gathering/enterGathering';
import styled from 'styled-components/native';
import LoadingModal from '../common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

interface GatherInfo {
  gatherId: number;
  gatherName: string;
}

interface GatheringListRequestProps {
  handleRefresh: (refreshing: boolean) => void;
  refreshing: boolean;
}

const GatheringListRequest: React.FC<GatheringListRequestProps> = ({
  handleRefresh,
  refreshing,
}) => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateEnterGatheringInfo} = useEnterGatheringActions();

  // State Management
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // API Hooks
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringList();

  // Effects
  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (refreshing) {
      handleRefetch();
    }
  }, [refreshing]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  // Handlers
  const handleRefetch = async () => {
    await refetch().then(() => {
      handleRefresh(false);
    });
  };

  if (isError) {
    return <InfoMessageView message="모임 목록 조회 실패:(" />;
  }

  const pressEnterGathering = (item: GatherInfo) => {
    updateEnterGatheringInfo({
      gatherId: item.gatherId,
      gatherName: item.gatherName,
    });
    navigation.navigate('GatheringRoutes', {
      screen: 'GatheringInfo',
      params: {gatherId: item.gatherId},
    });
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <NameList
        itemList={gatheringList}
        handleClickItem={pressEnterGathering}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default GatheringListRequest;

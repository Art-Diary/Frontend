import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RootStackNavigationProp} from '~/App';
import NameList from '~/components/mate/NameList';
import {useFetchGatheringList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useEnterGatheringActions} from '~/zustand/gathering/enterGathering';
import styled from 'styled-components/native';

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
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateEnterGatheringInfo} = useEnterGatheringActions();
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchGatheringList();

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

  const handleRefetch = async () => {
    await refetch().then(() => {
      handleRefresh(false);
    });
  };

  if (isError) {
    return <ErrorMessageView message="모임 목록 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="모임 목록 조회 중:)" />;
  }

  const pressEnterGathering = (item: GatherInfo) => {
    updateEnterGatheringInfo({
      gatherId: item.gatherId,
      gatherName: item.gatherName,
    });
    navigation.navigate('GatheringRoutes', {
      screen: 'GatheringInfo',
      params: undefined,
    });
  };

  return (
    <Container>
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

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {AddMyExhButton} from '~/assets/images';
import Header from '~/components/common/Header';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import ExhMateList from './ExhMateList';
import NameList from '~/components/mate/NameList';
import {useFetchGatheringList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';

interface GatherInfo {
  gatherId: number;
  gatherName: string;
}

const MateListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringList();

  if (isError) {
    return <ErrorMessageView message="모임 목록 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="모임 목록 조회 중:)" />;
  }

  const pressCreateGathering = () => {
    // 새 모임 생성
    navigation.navigate('CreateGathering');
  };

  const pressEnterGathering = (item: GatherInfo) => {
    navigation.navigate('GatheringInfo', {
      gatherId: item.gatherId,
      gatherName: item.gatherName,
    });
  };

  return (
    <Container>
      {/* header */}
      <Header title={'전시메이트'}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewMate')}>
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <Contents>
        <ContentText>모임 목록</ContentText>
        <NameList
          itemList={gatheringList}
          handleCreate={pressCreateGathering}
          handleClickItem={pressEnterGathering}
        />
        <Dot />
        <ContentText>전시메이트 목록</ContentText>
        <ExhMateList />
      </Contents>
    </Container>
  );
};

export default MateListScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  padding-top: ${wp(12)}px;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
  gap: 10px;
`;

const ContentText = styled.Text`
  font-size: ${fp(22)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const Dot = styled.View`
  width: 100%;
  border-bottom-width: ${wp(1.3)}px;
  border-bottom-color: #d3d3d3;
  border-style: dashed;
`;

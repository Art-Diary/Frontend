import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useFetchGatheringList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import LoadingModal from '~/components/common/modal/LoadingModal';

interface GatherInfo {
  gatherId: number;
  gatherName: string;
}

const GatheringList = () => {
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
  };

  const pressEnterGathering = (item: GatherInfo) => {
    // 모임 클릭
  };

  return (
    <Container>
      {/* 모임 리스트 */}
      <TouchableOpacity onPress={pressCreateGathering}>
        <GatheringAdd>
          <GatheringName isAdd={true}>+</GatheringName>
        </GatheringAdd>
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {gatheringList.map((item: GatherInfo, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => pressEnterGathering(item)}>
              <GatheringItem isLast={gatheringList.length - 1 === index}>
                <GatheringName>{item.gatherName}</GatheringName>
              </GatheringItem>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default GatheringList;

/** style */
const Container = styled.View`
  flex-direction: row;
  padding-bottom: ${hp(5)}px;
  gap: 10px;
`;

const GatheringAdd = styled.View`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-width: 1.1px;
  border-color: #979797;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  height: ${wp(40)}px;
  align-items: center;
  justify-content: center;
`;

interface GatheringItemProps {
  isLast: boolean;
}

const GatheringItem = styled.View<GatheringItemProps>`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #ff6f61;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
  height: ${wp(40)}px;
  align-items: center;
  justify-content: center;
  margin-right: ${(props: GatheringItemProps) =>
    props.isLast ? '0px' : '10px'};
`;

interface GatheringNameProps {
  isAdd: boolean;
}

const GatheringName = styled.Text<GatheringNameProps>`
  font-size: ${fp(19)}px;
  color: ${(props: GatheringNameProps) => (props.isAdd ? '#979797' : 'white')};
  font-family: 'omyu pretty';
`;

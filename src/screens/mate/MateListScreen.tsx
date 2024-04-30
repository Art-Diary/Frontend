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
import GatheringList from './GatheringList';
import ExhMateList from './ExhMateList';

const MateListScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Container>
      {/* header */}
      <Header title={'전시메이트'}>
        <TouchableOpacity>
          {/* onPress={() => navigation.navigate('')} */}
          <AddMyExhButton />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <Contents>
        <ContentText>모임 목록</ContentText>
        <GatheringList />
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

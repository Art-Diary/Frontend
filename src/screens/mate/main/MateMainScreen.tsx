import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import Header from '~/components/common/Header';
import {
  heightPercentage as hp,
  fontPercentage as fp,
  widthPercentage as wp,
} from '~/components/common/ResponsiveSize';
import ExhMateList from './ExhMateList';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import GatheringListRequest from './GatheringListRequest';
import {AddMyExhButtonIcon} from '~/components/common/icon';

const MateMainScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'mate') {
        updateTab('mate');
      }
    }
  }, [isFocused]);
  const pressCreateGathering = () => {
    // 새 모임 생성
    navigation.navigate('CreateGathering');
  };

  return (
    <Container>
      {/* header */}
      <Header title={'전시메이트'}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewMate')}>
          <AddMyExhButtonIcon />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <Contents>
        <GatheringList>
          <ContentText>모임 목록</ContentText>
          <RowView>
            <AddNewItem onPress={pressCreateGathering}>
              <NameText isAdd={true}>+</NameText>
            </AddNewItem>
            <GatheringListRequest />
          </RowView>
        </GatheringList>
        <Dot />
        <MateList>
          <ContentText>전시메이트 목록</ContentText>
          <ExhMateList />
        </MateList>
      </Contents>
    </Container>
  );
};

export default MateMainScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  padding-top: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const GatheringList = styled.View`
  flex-direction: column;
  background-color: #f6f6f6;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const RowView = styled.View`
  flex-direction: row;
  padding-bottom: ${hp(3)}px;
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

const MateList = styled.View`
  flex: 1;
  flex-direction: column;
  padding-left: ${wp(12)}px;
  padding-right: ${wp(12)}px;
  gap: ${wp(12)}px;
`;

const AddNewItem = styled.TouchableOpacity`
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

interface NameProps {
  isAdd: boolean;
}

const NameText = styled.Text<NameProps>`
  font-size: ${fp(19)}px;
  color: ${(props: NameProps) => (props.isAdd ? '#979797' : 'white')};
  font-family: 'omyu pretty';
`;

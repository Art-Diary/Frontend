import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RefreshControl, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import Header from '~/components/common/Header';
import {
  responseFont as rf,
  widthSizePercentage as wp,
  heightSizePercentage as hp,
} from '~/components/common/ResponsiveSize';
import ExhMateList from './ExhMateList';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import GatheringListRequest from './GatheringListRequest';
import {AddMyExhButtonIcon} from '~/components/common/icon';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  DASH_WIDTH,
  FONT_NAME,
} from '~/components/common/style';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';

const MateMainScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'mate') {
        updateTab('mate');
        updateDate(null);
      }
    }
  }, [isFocused]);
  const pressCreateGathering = () => {
    // 새 모임 생성
    navigation.navigate('CreateGathering');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  return (
    <Container>
      {/* header */}
      <Header title={'전시메이트'}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('AddNewMate')}>
          <AddMyExhButtonIcon />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <RefreshView
        data={['a']}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({}) => (
          <Contents>
            <GatheringList>
              <ContentText>모임 목록</ContentText>
              <RowView>
                <AddNewItem activeOpacity={0.6} onPress={pressCreateGathering}>
                  <NameText isAdd={true}>+</NameText>
                </AddNewItem>
                <GatheringListRequest
                  handleRefresh={setRefreshing}
                  refreshing={refreshing}
                />
              </RowView>
            </GatheringList>
            <Dot />
            <MateList>
              <ContentText>전시메이트 목록</ContentText>
            </MateList>
            <ExhMateList />
          </Contents>
        )}
      />
    </Container>
  );
};

export default MateMainScreen;

/** style */
const Container = styled.View`
  flex: 1;
`;

const RefreshView = styled.FlatList`
  background-color: ${BACK_COLOR};
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding-top: ${wp(3.3)}px;
  gap: ${wp(3.3)}px;
`;

const GatheringList = styled.View`
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding-left: ${wp(3.3)}px;
  padding-right: ${wp(3.3)}px;
  gap: ${wp(3.3)}px;
`;

const RowView = styled.View`
  flex-direction: row;
  gap: ${wp(2.3)}px;
`;

const ContentText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const Dot = styled.View`
  width: 100%;
  border-bottom-width: ${DASH_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  border-style: dashed;
`;

const MateList = styled.View`
  padding-left: ${wp(3.3)}px;
  padding-right: ${wp(3.3)}px;
`;

const AddNewItem = styled.TouchableOpacity`
  border-top-left-radius: ${BUTTON_RADIUS}px;
  border-top-right-radius: ${BUTTON_RADIUS}px;
  border-width: ${wp(0.3)}px;
  border-color: ${MIDDLE_GREY};
  padding-left: ${wp(4.2)}px;
  padding-right: ${wp(4.2)}px;
  height: ${wp(11.2)}px;
  align-items: center;
  justify-content: center;
`;

interface NameProps {
  isAdd: boolean;
}

const NameText = styled.Text<NameProps>`
  font-size: ${rf(18)}px;
  color: ${(props: NameProps) => (props.isAdd ? `${MIDDLE_GREY}` : 'white')};
  font-family: ${FONT_NAME};
`;

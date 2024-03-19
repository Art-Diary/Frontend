import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import InfoMessage from '~/components/common/InfoMessage';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyDiaryActions} from '~/zustand/mydiary/mydiary';
import Loading from '~/components/common/Loading';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import {LightStarIcon} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

const StoredExhList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateExhId} = useMyDiaryActions();
  const {data: myExhList, isLoading, isError, refetch} = useFetchMyExhList();

  useEffect(() => {
    refetch(); // 데이터를 다시 가져오는 메서드를 사용하여 데이터를 다시 가져옴
  }, []); // 처음 렌더링 시에만 호출되도록 빈 배열 전달

  if (isError) {
    return <InfoMessage message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <Loading message={'로딩 중 :)'} />;
  }

  if (myExhList.length === 0) {
    return <InfoMessage message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
  }

  const onPress = (exhId: number) => {
    updateExhId(exhId);
    navigation.navigate('MyDiaryRoutes');
  };

  return (
    <FlatList
      data={myExhList}
      renderItem={({item}) => (
        <RowView onPress={() => onPress(item.exhId)}>
          <Poster
            source={{uri: `data:image/png;base64,${item.poster}`}}
            alt={'이미지 읽기 실패'}
            resizeMode="contain"
          />
          <Contents>
            <ExhTitle numberOfLines={2} ellipsizeMode="tail">
              {item.exhName}
            </ExhTitle>
            <AvgRate>
              <AvgRateText>{item.rate.toFixed(2)}</AvgRateText>
              <LightStarIcon />
            </AvgRate>
          </Contents>
        </RowView>
      )}
      numColumns={2}
    />
  );
};

export default StoredExhList;

/** style */
const RowView = styled.TouchableOpacity`
  gap: ${hp(6.5)}px;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding-top: ${hp(15)}px;
  padding-bottom: ${hp(10)}px;
  border-color: #d3d3d3;
  border-right-width: ${hp(0.3)}px; // 테두리 너비
  border-bottom-width: ${hp(0.3)}px; // 테두리 너비
`;

const Poster = styled.Image`
  width: ${wp(115)}px;
  height: ${hp(129.23)}px;
`;

const Contents = styled.View`
  flex-direction: column;
  align-items: center;
  padding-left: ${wp(22)}px;
  padding-right: ${wp(22)}px;
`;

const ExhTitle = styled.Text`
  font-size: ${fp(17.2)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  text-align: center;
`;

const AvgRate = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvgRateText = styled.Text`
  font-size: ${fp(15.8)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';
`;

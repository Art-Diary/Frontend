import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import InfoMessage from '~/components/common/InfoMessage';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyDiaryActions} from '~/zustand/mydiary/mydiary';
import Loading from '~/components/common/Loading';
import {useFetchMyExhList} from '~/api/queries/mydiary';
import {LightStarIcon} from '~/assets/images/index';

const MyExhList = () => {
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
    navigation.navigate('MyDiaries');
  };

  return (
    <View style={myDiaryStyles.view}>
      <FlatList
        data={myExhList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={contentStyles.viewRow}
            onPress={() => onPress(item.exhId)}>
            <Image
              source={{uri: `data:image/png;base64,${item.poster}`}}
              width={120}
              height={147.69}
              resizeMode="contain"
              alt={'이미지 읽기 실패'}
            />
            <View style={contentStyles.view2}>
              <Text
                style={contentStyles.exhTitle}
                numberOfLines={2}
                ellipsizeMode="tail">
                {item.exhName}
              </Text>
              <View style={contentStyles.starView}>
                <Text style={contentStyles.star}>{item.rate.toFixed(2)}</Text>
                <LightStarIcon />
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

export default MyExhList;

/** style */
const myDiaryStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
  },
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  button: {
    backgroundColor: '#FF6F61',
    borderRadius: 4,
    padding: 12,
  },
});

const contentStyles = StyleSheet.create({
  viewRow: {
    gap: 9,
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    paddingTop: 20,
    paddingBottom: 14,
    borderColor: '#D3D3D3',
    borderRightWidth: 0.5, // 테두리 너비
    borderBottomWidth: 0.5, // 테두리 너비
  },
  view2: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  exhTitle: {
    fontSize: 20,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
    textAlign: 'center',
  },
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    color: '#D3D3D3',
    fontFamily: 'omyu pretty',
  },
});

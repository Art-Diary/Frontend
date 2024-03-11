import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import InfoView from '~/components/InfoView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useMyExhActions} from '~/zustand/mydiary/myexhs';
import SvgIcon from '~/components/SvgIcon';
import LoadingView from '~/components/LoadingView';
import {useFetchMyExhList} from '~/api/queries/mydiary';

const MyExhList = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateExhId} = useMyExhActions();
  const {data: myExhList, isLoading, isError} = useFetchMyExhList();

  if (isError) {
    return <InfoView message={'에러 발생 ;('} />;
  }

  if (isLoading) {
    return <LoadingView message={'로딩 중 :)'} />;
  }

  if (myExhList.length === 0) {
    return <InfoView message={'아직 전시회에 대한 기록이 없습니다 >_<'} />;
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
                <SvgIcon name={'LightStarIcon'} />
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

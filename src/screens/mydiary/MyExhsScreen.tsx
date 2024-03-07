import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import Header from '~/components/Header';
import SvgIcon from '~/components/SvgIcon';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

const DATA = [
  {
    poster: 'Poster1',
    title:
      '미셸 들라크루아, 파리의 벨 에포크 미셸 들라크루아, 파리의 벨 에포크',
    star: '3.0',
  },
  {
    poster: 'Poster2',
    title: '안드레 부처 개인전',
    star: '1.0',
  },
  {
    poster: 'Poster2',
    title: '안드레 부처 개인전',
    star: '5.0',
  },
  {
    poster: 'Poster1',
    title: '미셸 들라크루아, 파리의 벨 에포크',
    star: '3.5',
  },
  {
    poster: 'Poster1',
    title: '미셸 들라크루아, 파리의 벨 에포크',
    star: '2.5',
  },
];

interface ItemProps {
  poster: string;
  title: string; // title prop의 타입을 문자열로 지정
  star: string;
}

const Item: React.FC<ItemProps> = ({title, star, poster}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <TouchableOpacity
      style={contentStyles.viewRow}
      onPress={() => navigation.navigate('MyDiaries')}>
      <SvgIcon width={120} height={147.69} name={poster} />
      <Text
        style={contentStyles.exhTitle}
        numberOfLines={2}
        ellipsizeMode="tail">
        {title}
      </Text>
      <View style={contentStyles.starView}>
        <Text style={contentStyles.star}>{star}</Text>
        <SvgIcon name={'LightStarIcon'} />
      </View>
    </TouchableOpacity>
  );
};

const MyExhsScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    // <Container bottom="Diary">
    <>
      {/* header */}
      <Header title={'내 기록'}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MyAddExhibition')}>
          <SvgIcon name="DiaryWriteButton" />
        </TouchableOpacity>
      </Header>

      {/* body */}
      <View style={myDiaryStyles.view}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item title={item.title} star={item.star} poster={item.poster} />
          )}
          numColumns={2}
        />
      </View>
    </>
    // </Container>
  );
};

export default MyExhsScreen;

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
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    padding: 20,
    borderColor: '#D3D3D3',
    borderRightWidth: 0.5, // 테두리 너비
    borderBottomWidth: 0.5, // 테두리 너비
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
    fontSize: 20,
    color: '#D3D3D3',
    fontFamily: 'omyu pretty',
  },
});

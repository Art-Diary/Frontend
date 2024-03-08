import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import SvgIcon from '~/components/SvgIcon';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';

interface ItemProps {
  poster: string;
  title: string; // title prop의 타입을 문자열로 지정
  star: number;
}

const MyExhItem: React.FC<ItemProps> = ({title, star, poster}) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <TouchableOpacity
      style={contentStyles.viewRow}
      onPress={() => navigation.navigate('MyDiaries')}>
      <Image
        source={{uri: `data:image/png;base64,${poster}`}}
        width={120}
        height={147.69}
        resizeMode="contain"
        alt={'이미지 읽기 실패'}
      />
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

export default MyExhItem;

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

import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SvgIcon from '~/components/SvgIcon';

interface HeaderProps {
  title: string; // title prop의 타입을 문자열로 지정
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <>
      <View style={headerStyles.view}>
        <View style={headerStyles.titleView}>
          <Text style={headerStyles.text}>{title}</Text>
        </View>
        <SvgIcon name="DiaryWriteButton" />
      </View>
    </>
  );
};

export default Header;

const headerStyles = StyleSheet.create({
  view: {
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between', // 양 끝으로 버튼 배치
    alignItems: 'center',
    padding: 17,
    width: '100%',
    height: 57,
    borderStyle: 'dashed',
    borderColor: '#D3D3D3',
    borderBottomWidth: 1.5, // 테두리 너비
    backgroundColor: '#F6F6F6',
  },
  titleView: {
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 4,
    padding: 12,
  },
});

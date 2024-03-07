import React, {ReactNode} from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface HeaderProps {
  title: string; // title prop의 타입을 문자열로 지정
  children: ReactNode;
}

const ContentHeader: React.FC<HeaderProps> = ({title, children}) => {
  return (
    <View style={headerStyles.view}>
      <Text style={headerStyles.text}>{title}</Text>
      {children}
    </View>
  );
};

export default ContentHeader;

const headerStyles = StyleSheet.create({
  view: {
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
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Header from './Header';

interface ContentsProps {
  title: string; // title prop의 타입을 문자열로 지정
}

const Contents: React.FC<ContentsProps> = ({title}) => {
  return (
    <>
      {/* header - 네비게이션 별 분리*/}
      <Header title={title} />
      <View style={contentStyles.view}>
        <Text style={contentStyles.text}>{title}</Text>
        {/* <Text style={contentStyles.text}>내 기록</Text>
      <TouchableOpacity style={contentStyles.button}>
        <Text style={[contentStyles.text, {color: '#FFFFFF'}]}>Press me!</Text>
      </TouchableOpacity> */}
      </View>
    </>
  );
};

export default Contents;

const contentStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F6F6F6',
    height: 53,
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

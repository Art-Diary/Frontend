import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MyExhAddScreen = () => {
  return <Text style={contentStyles.text}>[내 기록] 전시회 추가 화면</Text>;
};

export default MyExhAddScreen;

const contentStyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

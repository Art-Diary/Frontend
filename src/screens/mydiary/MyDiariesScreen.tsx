import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MyDiariesScreen = () => {
  return (
    <Text style={contentStyles.text}>[내 기록] 전시회 기록 목록 화면</Text>
  );
};

export default MyDiariesScreen;

const contentStyles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

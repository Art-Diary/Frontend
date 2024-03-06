import React from 'react';
import {Text, StyleSheet} from 'react-native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

const footerStyles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

const ExhScreen = () => {
  return <Text style={footerStyles.text}> exh screen</Text>;
};

export default ExhScreen;

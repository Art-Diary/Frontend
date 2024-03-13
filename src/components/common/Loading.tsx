import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({message}) => {
  return (
    <View style={infoStyles.view}>
      <Text style={infoStyles.text}>{message}</Text>
      <ActivityIndicator color={'#FF6F61'} />
    </View>
  );
};

export default Loading;

const infoStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  text: {
    fontSize: 20,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
    textAlign: 'center',
  },
});

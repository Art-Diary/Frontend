import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({message}) => {
  return (
    <View style={infoStyles.view}>
      <Text style={infoStyles.text}>{message}</Text>
    </View>
  );
};

export default InfoMessage;

const infoStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
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

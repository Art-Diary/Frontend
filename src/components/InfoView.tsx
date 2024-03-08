import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface InfoViewProps {
  message: string;
}

const InfoView: React.FC<InfoViewProps> = ({message}) => {
  return (
    <View style={infoStyles.view}>
      <Text style={infoStyles.text}>{message}</Text>
    </View>
  );
};

export default InfoView;

const infoStyles = StyleSheet.create({
  view: {
    flex: 1,
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

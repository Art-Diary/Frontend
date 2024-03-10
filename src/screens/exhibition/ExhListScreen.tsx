import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Header from '~/components/Header';

const ExhListScreen = () => {
  const navigation = useNavigation();
  return (
    // <Container bottom="Exhibition">
    <>
      {/* header */}
      <Header title={'전시회'} children={null} />

      {/* body */}
      <View style={contentStyles.view}>
        <Text style={contentStyles.text}>전시회</Text>
      </View>
    </>
    // </Container>
  );
};

export default ExhListScreen;

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
});
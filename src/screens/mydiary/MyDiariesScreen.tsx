import React from 'react';
import {Text, StyleSheet, Button, View} from 'react-native';
import {useMyExh} from '~/zustand/mydiary/myexhs';

const MyDiariesScreen = () => {
  const exhId = useMyExh(state => state.exhId);

  return (
    <View style={contentStyles.view}>
      <Text style={contentStyles.text}>
        [내 기록] 전시회 기록 목록 화면 {exhId}
      </Text>
      {/* <Button title="press" onPress={onPress} /> */}
    </View>
  );
};

export default MyDiariesScreen;

const contentStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

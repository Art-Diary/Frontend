import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackView from '~/components/BackView';
import {useMyDiaryExhId} from '~/zustand/mydiary/mydiary';
import MyDiaryList from './MyDiaryList';

const MyDiaryUpdateScreen = () => {
  const exhId = useMyDiaryExhId();

  return (
    <View style={screenStyles.view}>
      {/* header */}
      <BackView children={null}></BackView>

      {/* body */}
      <MyDiaryList />
    </View>
  );
};

export default MyDiaryUpdateScreen;

const screenStyles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});

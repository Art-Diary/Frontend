import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BackView from '~/components/BackView';
import SvgIcon from '~/components/SvgIcon';
import MyDiaryList from './MyDiaryList';

const MyDiaryListScreen = () => {
  return (
    <View style={screenStyles.view}>
      {/* header */}
      <BackView>
        <TouchableOpacity>
          <SvgIcon name="WriteDiaryButton" />
        </TouchableOpacity>
      </BackView>

      {/* body */}
      <MyDiaryList />
    </View>
  );
};

export default MyDiaryListScreen;

const screenStyles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});

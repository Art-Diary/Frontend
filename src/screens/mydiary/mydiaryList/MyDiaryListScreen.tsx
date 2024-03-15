import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BackView from '~/components/common/BackView';
import MyDiaryList from './MyDiaryList';
import {WriteDiaryButton} from '~/assets/images/index';

const MyDiaryListScreen = () => {
  return (
    <View style={screenStyles.view}>
      {/* header */}
      <BackView>
        <TouchableOpacity>
          <WriteDiaryButton />
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
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F6F6F6',
  },
});
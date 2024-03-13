import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDiaryListScreen from '~/screens/mydiary/mydiaryList/MyDiaryListScreen';

const MyDiary = createNativeStackNavigator();

// "내 기록"
const MyDiariesRoutes = () => {
  return (
    <MyDiary.Navigator initialRouteName="my-diaries-list">
      {/* 한 전시회에 대한 기록들 */}
      <MyDiary.Screen
        name="my-diaries-list"
        component={MyDiaryListScreen}
        options={{headerShown: false}}
      />
      {/* 기록 추가 */}
      {/* 기록 수정 */}
    </MyDiary.Navigator>
  );
};

export default MyDiariesRoutes;

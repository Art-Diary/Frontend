import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDiariesScreen from '~/screens/mydiary/MyDiariesScreen';

const MyDiary = createNativeStackNavigator();

// "내 기록"
const MyDiariesRoutes = () => {
  return (
    <MyDiary.Navigator initialRouteName="my-diaries-list">
      {/* 한 전시회에 대한 기록들 */}
      <MyDiary.Screen
        name="my-diaries-list"
        component={MyDiariesScreen}
        options={{headerShown: false}}
      />
      {/*  */}
      {/*  */}
    </MyDiary.Navigator>
  );
};

export default MyDiariesRoutes;

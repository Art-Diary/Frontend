import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MateExhListScreen from '~/screens/mate/mateExhList/MateExhListScreen';

const MateDiary = createNativeStackNavigator();

const MateDiaryRoutes = () => {
  return (
    <MateDiary.Navigator
      initialRouteName="MateExhList"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 전시회 목록 */}
      <MateDiary.Screen
        name="MateExhList"
        component={MateExhListScreen}
        options={{headerShown: false}}
      />
      {/* 한 전시회에 대한 기록들 */}
      {/* <MateDiary.Screen
        name="MateDiaryList"
        component={}
        options={{headerShown: false}}
      /> */}
      {/* 전시회에 대한 기록의 뒷 페이지 */}
      {/* <MateDiary.Screen
        name="MateDiaryBack"
        component={}
        options={{headerShown: false, animation: 'fade'}}
      /> */}
    </MateDiary.Navigator>
  );
};

export default MateDiaryRoutes;

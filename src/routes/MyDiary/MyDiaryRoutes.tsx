import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDiaryListScreen from '~/screens/mydiary/myDiaryList/MyDiaryListScreen';
import MyDiaryBackScreen from '~/screens/mydiary/myDiaryList/MyDiaryBackScreen';

const MyDiary = createNativeStackNavigator();

// "내 기록"
const MyDiariesRoutes = () => {
  return (
    <MyDiary.Navigator
      initialRouteName="MyDiaryList"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 한 전시회에 대한 기록들 */}
      <MyDiary.Screen
        name="MyDiaryList"
        component={MyDiaryListScreen}
        options={{headerShown: false}}
      />
      {/* 전시회에 대한 기록의 뒷 페이지 */}
      <MyDiary.Screen
        name="MyDiaryBack"
        component={MyDiaryBackScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
    </MyDiary.Navigator>
  );
};

export default MyDiariesRoutes;

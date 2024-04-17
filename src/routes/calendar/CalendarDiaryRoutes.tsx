import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CalendarDiaryListScreen from '~/screens/calendar/CalendarDiaryListScreen';
import CalendarDiaryBackScreen from '~/screens/calendar/CalendarDiaryBackScreen';

const CalendarDiary = createNativeStackNavigator();

const CalendarDiaryRoutes = () => {
  return (
    <CalendarDiary.Navigator
      initialRouteName="CalendarDiaryList"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 한 전시회에 대한 기록들 */}
      <CalendarDiary.Screen
        name="CalendarDiaryList"
        component={CalendarDiaryListScreen}
        options={{headerShown: false}}
      />
      {/* 전시회에 대한 기록의 뒷 페이지 */}
      <CalendarDiary.Screen
        name="CalendarDiaryBack"
        component={CalendarDiaryBackScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
    </CalendarDiary.Navigator>
  );
};

export default CalendarDiaryRoutes;

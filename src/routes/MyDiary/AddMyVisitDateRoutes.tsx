import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChooseVisitDateScreen from '~/screens/mydiary/chooseVisitDate/ChooseVisitDateScreen';
import AddSoloVisitDateScreen from '~/screens/mydiary/chooseVisitDate/AddSoloVisitDateScreen';

const AddMyVisitDate = createNativeStackNavigator();

// "내 기록"
const AddMyVisitDateRoutes = () => {
  return (
    <AddMyVisitDate.Navigator
      initialRouteName="ChooseVisitDate"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 방문한 전시회 날짜 선택 화면 */}
      <AddMyVisitDate.Screen
        name="ChooseVisitDate"
        component={ChooseVisitDateScreen}
        options={{headerShown: false}}
      />
      {/* 혼자 방문한 전시회 날짜 추가 화면 */}
      <AddMyVisitDate.Screen
        name="AddSoloVisitDate"
        component={AddSoloVisitDateScreen}
        options={{headerShown: false}}
      />
    </AddMyVisitDate.Navigator>
  );
};

export default AddMyVisitDateRoutes;

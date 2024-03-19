import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDiaryListScreen from '~/screens/mydiary/myDiaryList/MyDiaryListScreen';
import MyDiaryBackScreen from '~/screens/mydiary/myDiaryList/MyDiaryBackScreen';
import ChooseVisitDateScreen from '~/screens/mydiary/chooseVisitDate/ChooseVisitDateScreen';
import AddSoloVisitDateScreen from '~/screens/mydiary/chooseVisitDate/AddSoloVisitDateScreen';

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
      {/* 방문한 전시회 날짜 선택 화면 */}
      <MyDiary.Screen
        name="ChooseVisitDate"
        component={ChooseVisitDateScreen}
        options={{headerShown: false}}
      />
      {/* 혼자 방문한 전시회 날짜 추가 화면 */}
      <MyDiary.Screen
        name="AddSoloVisitDate"
        component={AddSoloVisitDateScreen}
        options={{headerShown: false}}
      />
      {/* 기록 추가 */}
      {/* 기록 수정 */}
    </MyDiary.Navigator>
  );
};

export default MyDiariesRoutes;

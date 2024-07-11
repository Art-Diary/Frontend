import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WriteMyDiaryInfoScreen from '~/screens/mydiary/writeDiary/WriteMyDiaryInfoScreen';
import WriteMyDiaryContentsScreen from '~/screens/mydiary/writeDiary/WriteMyDiaryContentsScreen';

const WriteDiary = createNativeStackNavigator();

const WriteMyDiaryRoutes = () => {
  return (
    <WriteDiary.Navigator
      initialRouteName="WriteMyDiaryInfo"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 기록 정보 작성(새로 추가 또는 수정) */}
      <WriteDiary.Screen
        name="WriteMyDiaryInfo"
        component={WriteMyDiaryInfoScreen}
        options={{headerShown: false}}
      />
      {/* 기록 내용 작성(새로 추가 또는 수정) */}
      <WriteDiary.Screen
        name="WriteMyDiaryContents"
        component={WriteMyDiaryContentsScreen}
        options={{headerShown: false}}
      />
    </WriteDiary.Navigator>
  );
};

export default WriteMyDiaryRoutes;

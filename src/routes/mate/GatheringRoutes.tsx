import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GatheringInfoScreen from '~/screens/mate/gathering/GatheringInfoScreen';
import {GatheringStackParamList} from '~/utils/types';
import GatheringDiaryListScreen from '~/screens/mate/gathering/GatheringDiaryListScreen';
import GatheringDiaryBackScreen from '~/screens/mate/gathering/GatheringDiaryBackScreen';

const Gathering = createNativeStackNavigator<GatheringStackParamList>();

const GatheringRoutes = () => {
  return (
    <Gathering.Navigator
      initialRouteName="GatheringInfo"
      screenOptions={{
        gestureEnabled: true, // 제스처 기능을 활성화합니다.
      }}>
      {/* 전시회 목록 */}
      <Gathering.Screen
        name="GatheringInfo"
        component={GatheringInfoScreen}
        options={{headerShown: false}}
      />
      {/* 한 전시회에 대한 기록들 */}
      <Gathering.Screen
        name="GatheringDiaryList"
        component={GatheringDiaryListScreen}
        options={{headerShown: false}}
      />
      {/* 전시회에 대한 기록의 뒷 페이지 */}
      <Gathering.Screen
        name="GatheringDiaryBack"
        component={GatheringDiaryBackScreen}
        options={{headerShown: false, animation: 'fade'}}
      />
    </Gathering.Navigator>
  );
};

export default GatheringRoutes;

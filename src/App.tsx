/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React from 'react';
import {LogBox} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import BottomRoutes from './routes/BottomRoutes';
import MyExhSearchScreen from './screens/mydiary/MyExhSearchScreen';
import MyDiaryRoutes from './routes/mydiary/MyDiaryRoutes';
import AddMyVisitDateRoutes from './routes/mydiary/AddMyVisitDateRoutes';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/common/modal/toastConfig';
import CalendarDiaryRoutes from './routes/calendar/CalendarDiaryRoutes';
import WriteMyDiaryRoutes from './routes/mydiary/WriteMyDiaryRoutes';
import ExhSearchName from './screens/exhibition/ExhSearchName';
import ExhDetailInfo from './screens/exhibition/ExhDetailInfo';
import LoginScreen from './screens/login/LoginScreen';
import CreateGatheringScreen from './screens/mate/main/CreateGatheringScreen';
import AddNewMateScreen from './screens/mate/main/AddNewMateScreen';
import MateDiaryRoutes from './routes/mate/MateDiaryRoutes';
import InitProfileScreen from './screens/login/InitProfileScreen';
import ExhToDiary from './screens/exhibition/ExhToDiary';
import ExhToDiaryBack from './screens/exhibition/ExhToDiaryBack';
import ExhToCal from './screens/exhibition/ExhToCal';
import {UserInfo} from './screens/login/UserInfo';
import GatheringRoutes from './routes/mate/GatheringRoutes';
import {RootStackParamList} from './utils/types';
import SettingRoutes from './routes/setting/SettingRoutes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RecoilRoot>
          <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{headerShown: false}}>
            {/* 홈 화면 = 내 기록 */}
            <Stack.Screen name="Main" component={BottomRoutes} />
            {/* [내 기록] 전시회 추가 화면 */}
            <Stack.Screen
              name="MyExhibitionSearch"
              component={MyExhSearchScreen}
            />
            {/* [내 기록] 한 전시회의 기록 목록 화면 */}
            <Stack.Screen name="MyDiaryRoutes" component={MyDiaryRoutes} />
            <Stack.Screen
              name="AddMyVisitDateRoutes"
              component={AddMyVisitDateRoutes}
            />
            <Stack.Screen
              name="WriteMyDiaryRoutes"
              component={WriteMyDiaryRoutes}
            />
            {/* [전시회] 전시회 상세 정보 */}
            <Stack.Screen name="ExhibitionSearch" component={ExhSearchName} />
            <Stack.Screen name="ExhDetailInfo" component={ExhDetailInfo} />
            <Stack.Screen name="ExhToDiary" component={ExhToDiary} />
            <Stack.Screen name="ExhToDiaryBack" component={ExhToDiaryBack} />
            <Stack.Screen name="ExhToCal" component={ExhToCal} />
            {/* [캘린더] 선택한 날짜의 전시회의 기록 목록 앞/뒤 화면 */}
            <Stack.Screen
              name="CalendarDiaryRoutes"
              component={CalendarDiaryRoutes}
            />
            {/* [전시 메이트] */}
            <Stack.Screen // 모임 정보 화면
              name="GatheringRoutes"
              component={GatheringRoutes}
            />
            <Stack.Screen
              name="CreateGathering"
              component={CreateGatheringScreen}
            />
            <Stack.Screen name="AddNewMate" component={AddNewMateScreen} />
            <Stack.Screen name="MateDiaryRoutes" component={MateDiaryRoutes} />
            {/* [설정] 프로필 수정, 좋아요, 알림 설정, 회원 탈퇴 */}
            <Stack.Screen name="SettingRoutes" component={SettingRoutes} />
            {/* 로그인 회원가입 */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="InitProfile" component={InitProfileScreen} />
            <Stack.Screen name="UserInfo" component={UserInfo} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

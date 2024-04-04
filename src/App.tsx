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
import FavoriteRoutes from './routes/setting/FavoriteRoutes';
import AlarmSettingScreen from './screens/setting/updateAlarm/AlarmSettingScreen';

type RootStackParamList = {
  Main: undefined;
  // mydiary
  MyExhibitionSearch: undefined;
  MyDiaryRoutes: undefined;
  MyDiaryBack: undefined;
  MyDiaryList: undefined;
  AddMyVisitDateRoutes: undefined;
  ChooseVisitDate: undefined;
  AddSoloVisitDate: undefined;
  WriteMyDiaryInfo: undefined;
  WriteMyDiaryContents: undefined;
  //setting
  FavoriteRoutes: undefined;
  FavoriteList: undefined;
  EditFavorite: undefined;
  AlarmSetting: undefined;
  // MyDiaries : {
  //     id: number;
  // };
};

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
            initialRouteName={'Main'}
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
            {/* [전시회] 전시회 상세 정보 */}
            {/* <Stack.Screen name="exhibition" component={ExhibitionRoutes} /> */}
            {/* 캘린더 화면 */}
            {/* 전시 메이트 화면 */}
            {/* [설정] 좋아요 전시회 목록 화면 */}
            <Stack.Screen name="FavoriteRoutes" component={FavoriteRoutes} />
            {/* [설정] 알림 설정 화면 */}
            <Stack.Screen name="AlarmSetting" component={AlarmSettingScreen} />
            {/* 로그인 회원가입 */}
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

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
import MyExhAddScreen from './screens/mydiary/MyExhAddScreen';
import MyDiaryRoutes from './routes/mydiary/MyDiaryRoutes';
import AddMyVisitDateRoutes from './routes/mydiary/AddMyVisitDateRoutes';
import Toast from 'react-native-toast-message';
import {toastConfig} from './components/common/modal/toastConfig';

type RootStackParamList = {
  Main: undefined;
  MyAddExhibition: undefined;
  MyDiaryRoutes: undefined;
  MyDiaryBack: undefined;
  MyDiaryList: undefined;
  AddMyVisitDateRoutes: undefined;
  ChooseVisitDate: undefined;
  AddSoloVisitDate: undefined;
  WriteMyDiaryInfo: undefined;
  WriteMyDiaryContents: undefined;
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
            {/* <Stack.Screen name="mydiary" component={MyDiaryRoutes} /> */}
            {/* [내 기록] 전시회 추가 화면 */}
            <Stack.Screen name="MyAddExhibition" component={MyExhAddScreen} />
            {/* [내 기록] 한 전시회의 기록 목록 화면 */}
            <Stack.Screen name="MyDiaryRoutes" component={MyDiaryRoutes} />
            <Stack.Screen
              name="AddMyVisitDateRoutes"
              component={AddMyVisitDateRoutes}
            />
            {/* [전시회] 전시회 상세 정보 */}
            {/* <Stack.Screen name="exhibition" component={ExhibitionRoutes} /> */}
            {/* 로그인 회원가입 */}
            {/* 캘린더 화면 */}
            {/* 전시 메이트 화면 */}
            {/* 설정 화면 */}
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </RecoilRoot>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

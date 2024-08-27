/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import ExhToMoreReview from './screens/exhibition/ExhToMoreReview';
import {UserInfo} from './screens/login/UserInfo';
import GatheringRoutes from './routes/mate/GatheringRoutes';
import {RootStackParamList} from './utils/stackTypes';
import SettingRoutes from './routes/setting/SettingRoutes';
import messaging from '@react-native-firebase/messaging';
import pushNoti from './utils/pushNoti';
import {linking} from './utils/deeplinkConfig';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LogBox, PermissionsAndroid, Platform} from 'react-native';
import {setNavigator} from './api/navigationService';
import ExhAddFormScreen from './screens/exhibition/ExhAddFormScreen';
import RegisterNewExhScreen from './screens/setting/RegisterNewExhScreen';
import PreviewRegExh from './screens/setting/PreviewRegExh';
import ConfirmRegExhScreen from './screens/setting/ConfirmRegExhScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const queryClient = new QueryClient();

LogBox.ignoreAllLogs();

export default function App() {
  const hasAndroidPermission = async () => {
    //외부 스토리지를 읽고 쓰는 권한 가져오기
    const permissionRead = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const permissionNoti = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

    const hasPermissionRead = await PermissionsAndroid.check(permissionRead);
    const hasPermissionNoti = await PermissionsAndroid.check(permissionNoti);

    const sdkVersion = Number(Platform.Version);

    if (hasPermissionRead || hasPermissionNoti) {
      return true;
    }
    if (sdkVersion >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(result => {
        if (result === 'granted') {
          console.log('POST_NOTIFICATIONS is granted.');
        } else {
          console.log('POST_NOTIFICATIONS is denied.');
        }
      });
    }
    if (Platform.OS === 'android') {
      if (sdkVersion >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ).then(result => {
          if (result === 'granted') {
            console.log('READ_MEDIA_IMAGES is granted.');
          } else {
            console.log('READ_MEDIA_IMAGES is denied.');
          }
        });
      } else {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(result => {
          if (result === 'granted') {
            console.log('READ_EXTERNAL_STORAGE is granted.');
          } else {
            console.log('READ_EXTERNAL_STORAGE is denied.');
          }
        });
      }
    }
    return true;
  };

  const getPermission = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }
  };

  useEffect(() => {
    getPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      pushNoti.displayNoti(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer
        linking={linking}
        ref={(
          navigatorRef: NavigationContainerRef<RootStackParamList> | null,
        ) => {
          setNavigator(navigatorRef);
        }}>
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
            <Stack.Screen name="ExhToMoreReview" component={ExhToMoreReview} />
            <Stack.Screen name="ExhAddForm" component={ExhAddFormScreen} />
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
            <Stack.Screen
              name="RegisterNewExhScreen"
              component={RegisterNewExhScreen}
            />
            <Stack.Screen
              name="ConfirmRegExhScreen"
              component={ConfirmRegExhScreen}
            />
            <Stack.Screen name="PreviewRegExh" component={PreviewRegExh} />
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

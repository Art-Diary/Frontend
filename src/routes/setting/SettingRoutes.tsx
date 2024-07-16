import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlarmSettingScreen from '~/screens/setting/updateAlarm/AlarmSettingScreen';
import EditProfileScreen from '~/screens/setting/EditProfileScreen';
import LeaveScreen from '~/screens/setting/LeaveScreen';
import FavoriteListScreen from '~/screens/setting/favoriteList/FavoriteListScreen';
import EditFavoriteScreen from '~/screens/setting/favoriteList/EditFavoriteScreen';
import {SettingStackParamList} from '~/utils/stackTypes';

const Setting = createNativeStackNavigator<SettingStackParamList>();

const SettingRoutes = () => {
  return (
    <Setting.Navigator
      initialRouteName="EditProfile"
      screenOptions={{gestureEnabled: true}}>
      {/* [설정] 프로필 수정 화면 */}
      <Setting.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      {/* [설정] 좋아요 전시회 목록 화면 */}
      <Setting.Screen
        name="FavoriteList"
        component={FavoriteListScreen}
        options={{headerShown: false}}
      />
      <Setting.Screen
        name="EditFavorite"
        component={EditFavoriteScreen}
        options={{headerShown: false}}
      />
      {/* [설정] 알림 설정 화면 */}
      <Setting.Screen
        name="AlarmSetting"
        component={AlarmSettingScreen}
        options={{headerShown: false}}
      />
      {/* [설정] 회원 탈퇴 */}
      <Setting.Screen
        name="LeaveArtDiary"
        component={LeaveScreen}
        options={{headerShown: false}}
      />
    </Setting.Navigator>
  );
};

export default SettingRoutes;

import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import SvgIcon from '~/components/SvgIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyExhListScreen from '~/screens/mydiary/myExhList/MyExhListScreen';
import ExhListScreen from '~/screens/exhibition/ExhListScreen';
import CalendarScreen from '~/screens/calendar/CalendarScreen';
import MateListScreen from '~/screens/mate/MateListScreen';
import SettingScreen from '~/screens/setting/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomRoutes = () => {
  return (
    <SafeAreaView style={commonStyles.view}>
      <Tab.Navigator
        initialRouteName="Diary"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Exhibition') {
              iconSource = focused ? (
                <SvgIcon name={'OnExhibitionButton'} />
              ) : (
                <SvgIcon name={'OffExhibitionButton'} />
              );
            } else if (route.name === 'Calender') {
              iconSource = focused ? (
                <SvgIcon name={'OnCalenderButton'} />
              ) : (
                <SvgIcon name={'OffCalenderButton'} />
              );
            } else if (route.name === 'Diary') {
              iconSource = <SvgIcon name={'OffDiaryButton'} />;
            } else if (route.name === 'Mate') {
              iconSource = focused ? (
                <SvgIcon name={'OnMateButton'} />
              ) : (
                <SvgIcon name={'OffMateButton'} />
              );
            } else if (route.name === 'Setting') {
              iconSource = focused ? (
                <SvgIcon name={'OnSettingButton'} />
              ) : (
                <SvgIcon name={'OffSettingButton'} />
              );
            }

            // 커스텀 아이콘 이미지를 반환합니다.
            return iconSource;
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: commonStyles.footerView,
        })}>
        <Tab.Screen name="Exhibition" component={ExhListScreen} />
        <Tab.Screen name="Calender" component={CalendarScreen} />
        <Tab.Screen name="Diary" component={MyExhListScreen} />
        <Tab.Screen name="Mate" component={MateListScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomRoutes;

/**
 * {justify-content}: 콘텐츠 항목 사이와 주위에 공간을 분배하느 방법 정의
 * https://velog.io/@cherry_eong/CSS-justify-content-%EC%86%8D%EC%84%B1%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90
 * "flex-direction: row;" 가로 배치
 * "flex-direction: column;" 세로 배치
 *
 * {flex: 1; 의미} https://velog.io/@mooongs/flex1%EC%9D%98-%EC%9D%98%EB%AF%B8
 */

const commonStyles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
    height: 57,
    borderStyle: 'dashed',
    borderColor: '#D3D3D3',
    borderTopWidth: 1.5, // 테두리 너비
    backgroundColor: '#F6F6F6',
    elevation: 0, // 상단 테두리의 음영 효과를 없애기 위해 elevation 속성을 0으로 설정
  },
});

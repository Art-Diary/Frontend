import React from 'react';
import {StyleSheet} from 'react-native';
import SvgIcon from '~/components/SvgIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Contents from './Contents';

const Tab = createBottomTabNavigator();

function ExhibitionScreen() {
  return <Contents title={'전시회'} />;
}
function CalendarScreen() {
  return <Contents title={'캘린더'} />;
}
function DiaryScreen() {
  return <Contents title={'내 기록'} />;
}
function FriendScreen() {
  return <Contents title={'친구'} />;
}
function SettingScreen() {
  return <Contents title={'설정'} />;
}

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Exhibition') {
            iconSource = focused ? 'OnExhibitionButton' : 'OffExhibitionButton';
          } else if (route.name === 'Calender') {
            iconSource = focused ? 'OnCalenderButton' : 'OffCalenderButton';
          } else if (route.name === 'Diary') {
            iconSource = focused ? 'OffDiaryButton' : 'OffDiaryButton';
          } else if (route.name === 'Friend') {
            iconSource = focused ? 'OnFriendButton' : 'OffFriendButton';
          } else if (route.name === 'Setting') {
            iconSource = focused ? 'OnSettingButton' : 'OffSettingButton';
          }

          // 커스텀 아이콘 이미지를 반환합니다.
          return <SvgIcon name={iconSource} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: footerStyles.view,
      })}>
      <Tab.Screen name="Exhibition" component={ExhibitionScreen} />
      <Tab.Screen name="Calender" component={CalendarScreen} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomNav;

const footerStyles = StyleSheet.create({
  view: {
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
  button: {
    shadowColor: 'pink',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 5,
    shadowRadius: 5,
  },
  text: {
    fontSize: 25,
    color: '#3C4045',
    fontFamily: 'omyu pretty',
  },
});

import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import MyExhListScreen from '~/screens/mydiary/MyExhListScreen';
import ExhListScreen from '~/screens/exhibition/ExhListScreen';
import CalendarScreen from '~/screens/calendar/CalendarScreen';
import MateListScreen from '~/screens/mate/MateListScreen';
import SettingScreen from '~/screens/setting/SettingScreen';
import {
  OnExhibitionButton,
  OffExhibitionButton,
  OnCalenderButton,
  OffCalenderButton,
  OffDiaryButton,
  OnMateButton,
  OffMateButton,
  OnSettingButton,
  OffSettingButton,
} from '~/assets/images/index';
import {
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';

const Tab = createBottomTabNavigator();

const BottomRoutes = () => {
  return (
    <Container>
      <Tab.Navigator
        initialRouteName="Diary"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconSource;

            if (route.name === 'Exhibition') {
              iconSource = focused ? (
                <OnExhibitionButton />
              ) : (
                <OffExhibitionButton />
              );
            } else if (route.name === 'Calender') {
              iconSource = focused ? (
                <OnCalenderButton />
              ) : (
                <OffCalenderButton />
              );
            } else if (route.name === 'Diary') {
              iconSource = <OffDiaryButton />;
            } else if (route.name === 'Mate') {
              iconSource = focused ? <OnMateButton /> : <OffMateButton />;
            } else if (route.name === 'Setting') {
              iconSource = focused ? <OnSettingButton /> : <OffSettingButton />;
            }
            return iconSource;
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            ...footerStyles.view,
            paddingTop: wp(8),
            height: hp(41),
            borderTopWidth: wp(1.3), // 테두리 너비
          },
        })}
        backBehavior="none">
        <Tab.Screen name="Exhibition" component={ExhListScreen} />
        <Tab.Screen name="Calender" component={CalendarScreen} />
        <Tab.Screen name="Diary" component={MyExhListScreen} />
        <Tab.Screen name="Mate" component={MateListScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
      </Tab.Navigator>
    </Container>
  );
};

export default BottomRoutes;

/** style */
const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`;

const footerStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderStyle: 'dashed',
    borderColor: '#D3D3D3',
    backgroundColor: '#F6F6F6',
    elevation: 0, // 상단 테두리의 음영 효과를 없애기 위해 elevation 속성을 0으로 설정
  },
});

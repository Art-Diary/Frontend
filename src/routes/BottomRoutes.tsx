import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import MyExhListScreen from '~/screens/mydiary/MyExhListScreen';
import ExhListScreen from '~/screens/exhibition/ExhListScreen';
import CalendarScreen from '~/screens/calendar/CalendarScreen';
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
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import MateMainScreen from '~/screens/mate/main/MateMainScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Tab = createBottomTabNavigator();

const BottomRoutes = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    // 앱이 백그라운드에서 포그라운드로 전환될 때 링크를 처리
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // 앱이 처음 시작할 때 링크를 처리
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link) {
          handleDynamicLink(link);
        }
      });

    return () => unsubscribe();
  }, []);

  const handleDynamicLink = (link: any) => {
    // 링크의 URL에서 필요한 매개변수 추출
    if (link.url) {
      const url = link.url;
      const exhId = Number(url.split('?')[1].split('=')[1]);

      if (exhId) {
        // 네비게이션을 사용하여 해당 페이지로 이동
        navigation.navigate('ExhDetailInfo', {exhId});
      }
    }
  };

  const handlePressBack = () => {
    if (navigation?.canGoBack()) {
      BackHandler.exitApp(); //TODO 임시방편
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlePressBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handlePressBack);
    };
  }, [handlePressBack]);

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
        <Tab.Screen name="Mate" component={MateMainScreen} />
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

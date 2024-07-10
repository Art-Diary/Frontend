import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ProfileNameTag from './nameTag/ProfileNameTag';
import GreyNameTag from '../../components/common/GreyNameTag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SettingStackParamList} from '~/utils/types';
import notifee, {AndroidNotificationSetting} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {Linking, ScrollView} from 'react-native';
import {useQueryClient} from 'react-query';
import {mydiaryQueryKeys} from '~/api/queries/mydiary';
import {mateQueryKeys} from '~/api/queries/mate';
import {AREA_FONT_SIZE, FONT_NAME} from '~/components/common/style';
import {BACK_COLOR, DEFAULT_TEXT} from '~/components/common/colors';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';

const SettingScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {updateDate} = useDateFromExhActions();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'setting') {
        updateTab('setting');
        updateDate(null);
      }
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.setItem('initInfo', 'false');
    // TODO 나중에 로그아웃 구체적으로 하기 + 푸시 알림도 변경
    // 쿼리 제거
    queryClient.removeQueries(mydiaryQueryKeys.fetchMyExhList());
    queryClient.removeQueries(mateQueryKeys.fetchExhMateList());
    // 로그인 페이지로 이동
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleMoveTo = async (moveTo: string) => {
    // 알림 허용되어있는지 체크 후 알림 허용 페이지로 이동 또는 알림 설정 페이지로 이동
    const enabled = await messaging().hasPermission();
    const settings = await notifee.getNotificationSettings();

    if (!enabled) {
      Linking.openSettings();
    }
    if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
      await notifee.openAlarmPermissionSettings();
    }
    if (
      enabled &&
      settings.android.alarm === AndroidNotificationSetting.ENABLED
    ) {
      navigation.navigate('SettingRoutes', {
        screen: moveTo as keyof SettingStackParamList,
        params: undefined,
      });
    }
  };

  return (
    <Container>
      {/* header */}
      <Header title={'설정'} children={null} />

      {/* body */}
      <ScrollView>
        <Contents>
          {/* 내 프로필 */}
          <SettingWrapper>
            <TitleText>내 프로필</TitleText>
            <ProfileNameTag />
          </SettingWrapper>
          {/* 설정 */}
          <SettingWrapper>
            <TitleText>설정</TitleText>
            <GreyNameTag
              content="좋아요 전시회 목록"
              handleTouch={() => handleMoveTo('FavoriteList')}
            />
            <GreyNameTag
              content="푸시 알림 설정"
              handleTouch={() => handleMoveTo('AlarmSetting')}
            />
            <GreyNameTag content="도움말" />
          </SettingWrapper>
          {/* 회원정보 */}
          <SettingWrapper>
            <TitleText>회원정보</TitleText>
            <GreyNameTag content="로그아웃" handleTouch={handleLogout} />
            <GreyNameTag
              content="탈퇴"
              handleTouch={() => handleMoveTo('LeaveArtDiary')}
            />
          </SettingWrapper>
        </Contents>
      </ScrollView>
    </Container>
  );
};

export default SettingScreen;

/** style */
const Container = styled.View`
  flex: 1;
  background-color: ${BACK_COLOR};
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  padding: ${wp(4)}px;
  gap: ${wp(9)}px;
`;

const SettingWrapper = styled.View`
  gap: ${wp(3)}px;
  justify-content: start;
`;

const TitleText = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import Header from '~/components/common/Header';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import ProfileNameTag from './nameTag/ProfileNameTag';
import GreyNameTag from '../../components/common/GreyNameTag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking, PermissionsAndroid, Platform, ScrollView} from 'react-native';
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
import {SettingStackParamList} from '~/utils/stackTypes';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUserInfo} from '~/zustand/auth/auth';

const SettingScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const userInfo = useUserInfo();
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
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.setItem('initInfo', 'false');
    // TODO 나중에 로그아웃 구체적으로 하기 + 푸시 알림도 변경
    // 쿼리 제거
    queryClient.removeQueries(mydiaryQueryKeys.fetchMyExhList());
    queryClient.removeQueries(mateQueryKeys.fetchExhMateList());
    showToast('로그아웃 되었습니다.');
    // 로그인 페이지로 이동
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleMoveTo = async (moveTo: string) => {
    navigation.navigate('SettingRoutes', {
      screen: moveTo as keyof SettingStackParamList,
      params: undefined,
    });
  };

  const handleMoveToAlarm = async (moveTo: string) => {
    const checkNotification = async () => {
      // 알림 허용되어있는지 체크 후 알림 허용 페이지로 이동 또는 알림 설정 페이지로 이동
      const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

      const hasPermission = await PermissionsAndroid.check(permission);

      if (!hasPermission) {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

          if (result === RESULTS.GRANTED) {
            console.log('POST_NOTIFICATIONS permission granted');
            return true;
          } else {
            console.log('POST_NOTIFICATIONS permission denied');
            return false;
          }
        }
      }
      return true;
    };

    const resultCheck = await checkNotification();

    if (resultCheck) {
      navigation.navigate('SettingRoutes', {
        screen: moveTo as keyof SettingStackParamList,
        params: undefined,
      });
    } else {
      Linking.openSettings().catch(() => {
        showToast('설정으로 이동할 수 없습니다.');
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
              handleTouch={() => handleMoveToAlarm('AlarmSetting')}
            />
            <GreyNameTag
              content="전시회 등록 확인"
              handleTouch={() =>
                navigation.navigate('RegExhList', {isAdmin: false})
              }
            />
            {userInfo.authInfo.role === 'ADMIN' && (
              <GreyNameTag
                content="전시회 등록 확인 (관리자)"
                handleTouch={() =>
                  navigation.navigate('RegExhList', {isAdmin: true})
                }
              />
            )}
            <GreyNameTag
              content="Q&A"
              handleTouch={() =>
                navigation.navigate('QnaList', {isAdmin: false})
              }
            />
            {userInfo.authInfo.role === 'ADMIN' && (
              <GreyNameTag
                content="Q&A (관리자)"
                handleTouch={() =>
                  navigation.navigate('QnaList', {isAdmin: true})
                }
              />
            )}
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

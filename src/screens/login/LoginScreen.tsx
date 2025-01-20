import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import GreyNameTag from '../../components/common/GreyNameTag';
import {handleGoogleLogin} from './GoogleLogin';
import {handleNaverLogin} from './NaverLogin';
import {useUserLoginActions} from '~/zustand/auth/authLogin';
import {
  useFetchUserInfo,
  // useLoginTest,
  useLoginUser,
  useUpdateAlarmToken,
} from '~/api/queries/auth';
import {useUserActions} from '~/zustand/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleKakaoLogin} from './KakaoLogin';
import messaging from '@react-native-firebase/messaging';
import {FONT_NAME} from '~/components/common/style';
import {BACK_COLOR, MAIN_COLOR} from '~/components/common/colors';
import {
  GoogleLogoIcon,
  KakaoLogoIcon,
  NaverLogoIcon,
} from '~/components/common/icon';
import EmailDuplicateModal from './EmailDuplicateModal';
import {LoginUserParams} from '~/api/auth';
import notifee, {EventDetail, EventType} from '@notifee/react-native';
import pushNoti from '~/utils/pushNoti';
import {Linking} from 'react-native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {initializeClient} from '~/api/client';

type LoginUserInfo = {
  email: string;
  providerType: string;
  providerId: string;
};

const LoginScreen = () => {
  // Hooks
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();
  const {updateAuthInfo} = useUserActions();
  const {updateEmail, updateProviderId, updateProviderType} =
    useUserLoginActions();

  // State Management
  const [isDuplicateModalOpen, setDuplicateModalOpen] =
    useState<boolean>(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserParams | null>(
    null,
  );
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>('');
  const [isErrorLoginOpen, setIsErrorLoginOpen] = useState<boolean>(false);
  const [isErrorAlarmOpen, setIsErrorAlarmOpen] = useState<boolean>(false);

  // API Hooks
  const {
    mutate: loginUser,
    isLoading: isLoadingLogin,
    isError: isErrorLogin,
    isSuccess: isSuccessLogin,
    data: resData,
    error,
  } = useLoginUser();
  const {
    isLoading: isLoadingAlarmToken,
    isError: isErrorAlarmToken,
    isSuccess: isSuccessAlarmToken,
    mutate: updateAlarmToken,
  } = useUpdateAlarmToken();
  const {refetch} = useFetchUserInfo();
  // const {mutate: testerLogin, isSuccess: isSuccessTest} = useLoginTest(); // TODO 삭제

  // Effects
  useEffect(() => {
    const init = async () => {
      try {
        await initializeClient();
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };
    const checkUserId = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const initInfo = await AsyncStorage.getItem('initInfo');

      // TODO 삭제
      console.log('{login page}', initInfo, accessToken);
      if (accessToken && initInfo === 'true') {
        // 토큰 확인
        const alarmToken = (await handlePushToken()) ?? null;
        if (alarmToken && alarmToken !== pushToken) {
          updateAlarmToken(alarmToken);
        }
        setIsLoadingOpen(false);
        refetch().then(result => {
          const res = result.data;

          console.log(res);
          updateAuthInfo({...res, role: res.roleType});
          setIsLoadingOpen(false);
          navigation.navigate('Main', {screen: 'Diary'});
        });
      }
    };
    if (isFocused) {
      setIsLoadingOpen(true);
      init();
      checkUserId();
      setIsLoadingOpen(false);
    }
  }, [isFocused]);
  // [AxiosError: Network Error]
  useEffect(() => {
    if (isSuccessAlarmToken) {
      handlePushToken().then(setPushToken);
    }
    if (isErrorAlarmToken) {
      setIsErrorAlarmOpen(true);
    }
  }, [isSuccessAlarmToken, isErrorAlarmToken]);

  useEffect(() => {
    const handlePressNotification = async (detail: EventDetail) => {
      const data = detail.notification?.data;
      // 처리할 이벤트 추가
      if (data) {
        const info = Object(data.info);
        const type = info.type;
        const value = info.id;

        if (type === 'exhibition') {
          navigation.navigate('ExhDetailInfo', {exhId: value});
        } else if (type === 'gathering') {
          navigation.navigate('GatheringRoutes', {
            screen: 'GatheringInfo',
            params: {gatherId: value},
          });
        } else if (type === 'calendar') {
          navigation.navigate('Main', {
            screen: 'Calendar',
            params: {fromPushAlarm: true, visitDate: value},
          });
        }
      }
    };

    const handleDismissedNotification = async (detail: EventDetail) => {
      // noti 삭제
      if (detail.notification?.id) {
        notifee.cancelNotification(detail.notification.id);
        notifee.cancelDisplayedNotification(detail.notification.id);
      }
    };

    if (isFocused) {
      notifee.onForegroundEvent(async ({type, detail}) => {
        if (type === EventType.PRESS) {
          await handlePressNotification(detail);
        } else if (type === EventType.DISMISSED) {
          await handleDismissedNotification(detail);
        }
      });

      notifee.onBackgroundEvent(async ({type, detail}) => {
        if (type === EventType.PRESS) {
          const data = detail.notification?.data;

          if (data) {
            const info = Object(data.info);
            const type = info.type;
            const id = Number(info.id);

            if (type === 'exhibition') {
              await Linking.openURL(`artdiary://exhibition/${id}`);
            } else if (type === 'gathering') {
              await Linking.openURL(`artdiary://gathering/${id}`);
            } else if (type === 'calendar') {
              await Linking.openURL(`artdiary://calendar`);
            }
          }
        } else if (type === EventType.DISMISSED) {
          await handleDismissedNotification(detail);
        }
      });

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        await pushNoti.displayNoti(remoteMessage);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isErrorLogin) {
      const statusCode = error?.response?.status;
      error?.response?.message;
      console.log(error?.response);
      showToast(error?.response);

      if (statusCode === 409) {
        // 상태 코드를 체크 (예: 409 Conflict)
        setDuplicateModalOpen(true);
      } else {
        console.log(statusCode + ': 로그인 요청 실패');
        // showToast('다시 시도해주세요.');
        setIsErrorLoginOpen(true);
      }
    }
    if (isSuccessLogin) {
      const data = resData.data;
      updateAuthInfo({...data, role: data.roleType});
      if (data.initInfo) {
        navigation.navigate('Main', {screen: 'Diary'});
      } else {
        navigation.navigate('InitProfile');
      }
    }
  }, [isErrorLogin, isSuccessLogin, resData]);

  // Handlers
  const handleLogin = async (
    type: string,
  ): Promise<LoginUserInfo | undefined> => {
    setIsLoadingOpen(true);
    setLoginType(type);

    let loginInfo;
    switch (type) {
      case 'google':
        loginInfo = await handleGoogleLogin();
        break;
      case 'naver':
        loginInfo = await handleNaverLogin();
        break;
      case 'kakao':
        loginInfo = await handleKakaoLogin();
        break;
      default:
        setIsLoadingOpen(false);
        return;
    }
    if (loginInfo && loginInfo.email !== '') {
      updateEmail(loginInfo.email);
      updateProviderId(loginInfo.providerId);
      updateProviderType(loginInfo.providerType);
      // 토큰 확인
      const alarmToken = (await handlePushToken()) ?? null;
      const userData = {
        email: loginInfo.email,
        providerId: loginInfo.providerId,
        providerType: loginInfo.providerType,
        alarmToken: (await handlePushToken()) ?? null,
      };
      showToast(loginInfo.email);
      setPushToken(alarmToken);
      setLoginUserInfo(userData);
      loginUser(userData);
    } else {
      setIsErrorLoginOpen(true);
    }

    setIsLoadingOpen(false);
  };

  const handlePushToken = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      return messaging().getToken();
    }
    return null;
  };

  // // TODO 삭제
  // useEffect(() => {
  //   if (isSuccessTest) {
  //     navigation.navigate('UserInfo');
  //   }
  // }, [isSuccessTest]);

  // // TODO 삭제
  // const handleTester = async () => {
  //   testerLogin(3);
  // };

  const handleLoginRetry = async () => {
    setIsErrorLoginOpen(false);
    handleLogin(loginType);
  };

  const handleUpdateAlarmToken = async () => {
    setIsErrorAlarmOpen(false);
    const alarmToken = await handlePushToken();
    if (alarmToken !== pushToken) {
      updateAlarmToken(alarmToken);
    }
    // navigation.navigate('UserInfo');

    refetch().then(result => {
      const res = result.data;

      console.log(res);
      updateAuthInfo({...res, role: res.roleType});
      navigation.navigate('Main', {screen: 'Diary'});
    });
  };

  return (
    <Container>
      <LoadingModal
        isLoading={isLoadingLogin || isLoadingAlarmToken || isLoadingOpen}
      />
      <ErrorModal isError={isErrorLoginOpen} retry={handleLoginRetry} />
      <ErrorModal isError={isErrorAlarmOpen} retry={handleUpdateAlarmToken} />
      <Contents>
        <ArtDiaryMainWrapper>
          <ArtDiary>Art Diary</ArtDiary>
        </ArtDiaryMainWrapper>
        <LoginWrapper>
          <GreyNameTag
            login={true}
            content="Google 로그인"
            handleTouch={() => handleLogin('google')}>
            <GoogleLogoIcon />
          </GreyNameTag>
          <GreyNameTag
            login={true}
            content="Naver 로그인"
            handleTouch={() => handleLogin('naver')}>
            <NaverLogoIcon />
          </GreyNameTag>
          <GreyNameTag
            login={true}
            content="Kakao 로그인"
            handleTouch={() => handleLogin('kakao')}>
            <KakaoLogoIcon />
          </GreyNameTag>
          {/* TODO 삭제 */}
          {/* <CustomTouchable onPress={handleTester}>
            <Tester>테스터 3</Tester>
          </CustomTouchable> */}
        </LoginWrapper>
      </Contents>
      <LineWrapper>
        <Line />
      </LineWrapper>
      {isDuplicateModalOpen && loginUserInfo && (
        <EmailDuplicateModal
          handleCloseModal={() => setDuplicateModalOpen(false)}
          loginUserInfo={loginUserInfo}
        />
      )}
    </Container>
  );
};

export default LoginScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${MAIN_COLOR};
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LineWrapper = styled.View`
  height: 100%;
  padding-right: ${wp(7)}px;
  align-items: center;
`;

const Line = styled.View`
  height: 100%;
  background-color: ${BACK_COLOR};
  width: ${wp(6)}px;
`;

const ArtDiaryMainWrapper = styled.View`
  height: 70%;
  width: 100%;
  padding-top: ${hp(7)}px;
  align-items: center;
  justify-content: center;
`;

const ArtDiary = styled.Text`
  font-size: ${rf(100)}px;
  color: white;
  font-family: ${FONT_NAME};
  text-align: center;
`;

const LoginWrapper = styled.View`
  height: 50%;
  align-items: center;
  padding-top: ${hp(1)}px;
  padding-left: ${wp(5.5)}px;
  width: 100%;
  gap: ${hp(1.5)}px;
`;

const Tester = styled.Text`
  margin: 5px;
  font-size: ${rf(17)}px;
  color: white;
  font-family: ${FONT_NAME};
  text-decoration: underline;
`;

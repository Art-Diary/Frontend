import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import GreyNameTag from '../../components/common/GreyNameTag';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {handleGoogleLogin} from './GoogleLogin';
import {handleNaverLogin} from './NaverLogin';
import {useUserLoginActions} from '~/zustand/auth/authLogin';
import {
  useLoginTest,
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
import CustomTouchable from '~/components/common/CustomTouchable';

type LoginUserInfo = {
  email: string;
  providerType: string;
  providerId: string;
};

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateAuthInfo} = useUserActions();
  const {updateEmail, updateProviderId, updateProviderType} =
    useUserLoginActions();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [isDuplicateModalOpen, setDuplicateModalOpen] =
    useState<boolean>(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserParams | null>(
    null,
  );
  const {
    mutate: loginUser,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    data: resData,
    error,
  } = useLoginUser();
  const {mutate: updateAlarmToken} = useUpdateAlarmToken();
  const {mutate: testerLogin, isSuccess: isSuccessTest} = useLoginTest();

  useEffect(() => {
    const checkUserId = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const initInfo = await AsyncStorage.getItem('initInfo');
      // TODO 출력 삭제
      console.log('{login page}', initInfo, accessToken);
      if (accessToken && initInfo === 'true') {
        // 토큰 확인
        const alarmToken = await handlePushToken();
        if (alarmToken !== pushToken) {
          console.log('change token');
          setPushToken(alarmToken);
          updateAlarmToken(alarmToken);
        }
        navigation.navigate('UserInfo');
      }
    };
    checkUserId();
  }, [navigation]);

  const emailDuplicateModal = () => {
    // TODO
    // 일단 모달로 확인
    setDuplicateModalOpen(true);
  };

  useEffect(() => {
    if (isError) {
      const statusCode = error?.response?.status;

      if (statusCode === 409) {
        // 상태 코드를 체크 (예: 409 Conflict)
        emailDuplicateModal();
      } else {
        showToast('로그인에 실패했습니다.');
      }
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      const data = resData.data;
      updateAuthInfo({
        userId: data.userId,
        nickname: data.nickname,
        email: data.email,
        profile: data.profile,
        favoriteArt: data.favoriteArt,
        alarm1: data.alarm1,
        alarm2: data.alarm2,
        alarm3: data.alarm3,
        providerType: data.providerType,
      });
      navigation.navigate(data.initInfo ? 'Main' : 'InitProfile');
    }
  }, [isError, isLoading, isSuccess, resData, navigation, updateAuthInfo]);

  const handleLogin = async (
    type: string,
  ): Promise<LoginUserInfo | undefined> => {
    setIsLoadingOpen(true);
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
        showToast('로그인에 실패했습니다.');
        return;
    }
    if (loginInfo && loginInfo.email !== '') {
      updateEmail(loginInfo.email);
      updateProviderId(loginInfo.providerId);
      updateProviderType(loginInfo.providerType);
      // 토큰 확인
      const alarmToken = await handlePushToken();
      setPushToken(alarmToken);
      loginUser({...loginInfo, alarmToken});
      setLoginUserInfo({...loginInfo, alarmToken});
    } else {
      showToast('로그인에 실패했습니다.');
    }
    setIsLoadingOpen(false);
  };

  const handlePushToken = async () => {
    const enabled = await messaging().hasPermission();

    if (enabled) {
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        return fcmToken;
      }
    }
    return null;
  };

  // TODO 나중에 지우기
  useEffect(() => {
    if (isSuccessTest) {
      navigation.navigate('UserInfo');
    }
  }, [isSuccessTest]);

  // TODO 나중에 지우기
  const handleTester = async () => {
    testerLogin(3);
  };

  return (
    <Container>
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
          {/* TODO 나중에 지우기 */}
          <CustomTouchable onPress={handleTester}>
            <Tester>테스터 3</Tester>
          </CustomTouchable>
        </LoginWrapper>
      </Contents>
      <LineWrapper>
        <Line />
      </LineWrapper>
      {isLoadingOpen && <LoadingModal message={'로그인 시도 중 :)'} />}
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

import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  fontPercentage as fp,
  widthPercentage as wp,
  heightPercentage as hp,
} from '~/components/common/ResponsiveSize';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {GoogleIcon, KakaoIcon, NaverIcon} from '~/assets/images';
import {TouchableOpacity} from 'react-native';
import GreyNameTag from '../../components/common/GreyNameTag';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {handleGoogleLogin} from './GoogleLogin';
import {handleNaverLogin} from './NaverLogin';
import {useUserLoginActions} from '~/zustand/auth/authLogin';
import {useLoginUser} from '~/api/queries/auth';

type LoginUserInfo = {
  email: string;
  providerType: string;
  providerId: string;
};

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {updateEmail, updateProviderId, updateProviderType} =
    useUserLoginActions();
  const [loginUserInfo, setLoginUserInfo] = useState<LoginUserInfo>({
    email: '',
    providerType: '',
    providerId: '',
  });
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: loginUser,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
    data: responseData,
  } = useLoginUser(
    loginUserInfo.email,
    loginUserInfo.providerType,
    loginUserInfo.providerId,
  );

  useEffect(() => {
    if (loginUserInfo.providerType !== '') {
      loginUser();
    }
  }, [loginUserInfo.email]);

  useEffect(() => {
    if (isError) {
      showToast('로그인에 실패했습니다.');
    }
    if (!isLoading) {
      setIsLoadingOpen(false);
    }
    if (isSuccess) {
      const data = responseData.data;

      if (data.initInfo) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('InitProfile');
      }
    }
  }, [isError, isLoading, isSuccess]);

  const handleLogin = async (
    type: string,
  ): Promise<LoginUserInfo | undefined> => {
    setIsLoadingOpen(true);
    if (type === 'google') {
      return await handleGoogleLogin();
    } else if (type === 'naver') {
      return await handleNaverLogin();
    } else {
      // kakao
    }
    return undefined;
  };

  const loginWithIdToken = async (loginUserInfo: LoginUserInfo | undefined) => {
    if (!loginUserInfo || loginUserInfo.email === '') {
      setIsLoadingOpen(false);
      showToast('로그인에 실패했습니다.');
      return;
    }
    if (loginUserInfo.email !== '') {
      updateEmail(loginUserInfo.email);
      updateProviderId(loginUserInfo.providerId);
      updateProviderType(loginUserInfo.providerType);
      setLoginUserInfo({
        email: loginUserInfo.email,
        providerType: loginUserInfo.providerType,
        providerId: loginUserInfo.providerId,
      });
      setIsLoadingOpen(false);
      navigation.navigate('InitProfile');
    }
  };

  return (
    <Container>
      <Contents>
        <ArtDiary>Art Diary</ArtDiary>
        <LoginWrapper>
          <TouchableOpacity
            onPress={() =>
              handleLogin('google').then(userInfo => loginWithIdToken(userInfo))
            }>
            <GreyNameTag login={true} content="Google 로그인">
              <GoogleIcon />
            </GreyNameTag>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() =>
              handleLogin('naver').then(userInfo => loginWithIdToken(userInfo))
            }> */}
          <GreyNameTag login={true} content="Naver 로그인 아직 불가능">
            <NaverIcon />
          </GreyNameTag>
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity onPress={move}> */}
          <GreyNameTag login={true} content="Kakao 로그인 아직 불가능">
            <KakaoIcon />
          </GreyNameTag>
          {/* </TouchableOpacity> */}
        </LoginWrapper>
      </Contents>
      <LineWrapper>
        <Line />
      </LineWrapper>
      {isLoadingOpen && <LoadingModal message={'로그인 시동 중 :)'} />}
    </Container>
  );
};

export default LoginScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: #ff6f61;
`;

const Contents = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

const LineWrapper = styled.View`
  height: 100%;
  padding-left: ${wp(10)}px;
  padding-right: ${wp(10)}px;
  align-items: center;
`;

const Line = styled.View`
  height: 100%;
  background-color: #f6f6f6;
  width: 28px;
`;

const ArtDiary = styled.Text`
  font-size: ${fp(120)}px;
  color: white;
  font-family: 'omyu pretty';
  text-align: center;
`;

const LoginWrapper = styled.View`
  justify-content: center;
  padding-left: ${wp(35)}px;
  padding-right: ${wp(18)}px;
  width: 100%;
  gap: ${hp(-10)}px;
`;

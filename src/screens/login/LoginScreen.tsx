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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {GOOGLE_ID} from '@env';
import {useLoginUser} from '~/api/queries/auth';
import {showToast} from '~/components/common/modal/toastConfig';
import LoadingModal from '~/components/common/modal/LoadingModal';

GoogleSignin.configure({
  webClientId: GOOGLE_ID,
});

type GoogleUserInfo = {
  email: string;
  nickname: string;
  profile: string;
  providerType: string;
  providerId: string;
};

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [loginUserInfo, setLoginUserInfo] = useState<GoogleUserInfo>({
    email: '',
    nickname: '',
    profile: '',
    providerType: '',
    providerId: '',
  });
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const {
    mutate: loginUser,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
  } = useLoginUser(
    loginUserInfo.email,
    loginUserInfo.nickname,
    loginUserInfo.profile,
    loginUserInfo.providerType,
    loginUserInfo.providerId,
  );

  useEffect(() => {
    if (loginUserInfo.email !== '') {
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
      navigation.navigate('Main');
    }
  }, [isError, isLoading, isSuccess]);

  const handleGoogleLogin = async () => {
    setIsLoadingOpen(true);
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const {idToken, user} = userInfo;
    // Firebase Authentication에 Google ID 토큰을 제공하여 사용자를 인증하는 데 사용
    var googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    return {
      email: user.email,
      nickname: user.name ?? user.email,
      profile: user.photo ?? '',
      providerType: 'google',
      providerId: user.id,
    };
  };

  const loginWithIdToken = async (loginUserInfo: GoogleUserInfo) => {
    if (loginUserInfo.email !== '') {
      setLoginUserInfo(loginUserInfo);
    } else {
      showToast('로그인에 실패했습니다.');
      setIsLoadingOpen(false);
    }
  };

  return (
    <Container>
      <Contents>
        <ArtDiary>Art Diary</ArtDiary>
        <LoginWrapper>
          <TouchableOpacity
            onPress={() =>
              handleGoogleLogin().then(userInfo => loginWithIdToken(userInfo))
            }>
            <GreyNameTag login={true} content="Google 로그인만 가능">
              <GoogleIcon />
            </GreyNameTag>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={move}> */}
          <GreyNameTag login={true} content="Naver 로그인은 아직 불가능">
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

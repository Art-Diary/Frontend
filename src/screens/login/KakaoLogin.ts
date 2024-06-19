import {login, getProfile} from '@react-native-seoul/kakao-login';

export const handleKakaoLogin = async () => {
  try {
    const res = await login();
    const profileResult = await getProfile();
    if (profileResult) {
      return {
        email: profileResult.email,
        providerType: 'kakao',
        providerId: profileResult.id.toString(),
      };
    } else {
      return undefined;
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
};

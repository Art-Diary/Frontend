import {NAVER_CONSUMER_KEY, NAVER_CONSUMER_SECRET} from '@env';
import NaverLogin from '@react-native-seoul/naver-login';

const consumerKey = NAVER_CONSUMER_KEY;
const consumerSecret = NAVER_CONSUMER_SECRET;
const appName = 'ART DIARY';

export const handleNaverLogin = async () => {
  NaverLogin.initialize({
    appName,
    consumerKey,
    consumerSecret,
  });
  const {failureResponse, successResponse} = await NaverLogin.login();

  if (successResponse) {
    try {
      const profileResult = await NaverLogin.getProfile(
        successResponse.accessToken,
      );
      return {
        email: profileResult.response.email,
        providerType: 'naver',
        providerId: profileResult.response.id,
      };
    } catch (e) {
      console.error(e);
    }
  }
  return undefined;
};

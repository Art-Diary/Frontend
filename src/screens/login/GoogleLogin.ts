import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {GOOGLE_ID} from '@env';

export const handleGoogleLogin = async () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_ID,
  });
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  const {idToken, user} = userInfo;
  // Firebase Authentication에 Google ID 토큰을 제공하여 사용자를 인증하는 데 사용
  var googleCredential = auth.GoogleAuthProvider.credential(idToken);
  await auth().signInWithCredential(googleCredential);
  return {
    email: user.email,
    providerType: 'google',
    providerId: user.id,
  };
};

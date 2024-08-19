import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from './navigationService';
import {showToast} from '~/components/common/modal/toastConfig';

export const client = axios.create({
  baseURL: API_URL,
  timeout: 2000,
});

client.interceptors.request.use(async config => {
  if (!config.headers) {
    return config;
  }
  if (
    (config.url === '/users' ||
      config.url === '/users/unite' ||
      config.url === '/users/separate' ||
      config.url === '/users/reissue' ||
      config.url === '/users/test') &&
    config.method === 'post'
  ) {
    return config;
  }

  // 사용자의 accessToken
  const accessToken = await AsyncStorage.getItem('accessToken');

  if (accessToken) {
    // config.headers에 accessToken 추가
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

client.interceptors.response.use(
  res => res,
  async err => {
    const {config, response} = err;

    // if (!response) {
    //   throw new Error('[response] do not have response data');
    // }
    /** 1 */
    if (
      config.url === `/users/reissue` ||
      response.status !== 401 ||
      config.sent
    ) {
      if (config.url === `/users/reissue`) {
        // reissue error -> go to login page
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.setItem('initInfo', 'false');
        showToast('로그인 토큰 만료');
        navigate('Login', null);
      }
      return Promise.reject(err);
    }

    /** 2 */
    // 동일한 요청이 여러 번 보내지는 것을 방지
    config.sent = true;

    const oldAccessToken = await AsyncStorage.getItem('accessToken');

    try {
      const accessToken = await reissueAccessToken(oldAccessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return client(config);
    } catch (err) {
      console.log(err);
    }
  },
);

const reissueAccessToken = async (
  oldAccessToken: string | null,
): Promise<string | null> => {
  if (!oldAccessToken) {
    throw new Error('[refresh] old access token is null');
  }

  console.log('[refresh] access_token');

  try {
    const response = await client.post<{accessToken: string}>(
      `/users/reissue`,
      {accessToken: oldAccessToken},
    );
    const newAccessToken = response.data.accessToken;

    await AsyncStorage.setItem('accessToken', newAccessToken);

    return newAccessToken;
  } catch (err) {
    console.error('Failed to reissue access token:', err);
    return null;
  }
};

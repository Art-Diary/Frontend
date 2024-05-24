import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const client = axios.create({
  baseURL: 'http://172.30.1.1:8080',
=======
  baseURL: API_URL,
>>>>>>> 9a34ffc45cebc8529ccf19ceb5dc6ceb3dfc56f1
  timeout: 2000,
});

client.interceptors.request.use(async config => {
  if (!config.headers) {
    return config;
  }
  if (config.url === '/users' && config.method === 'post') {
    return config;
  }
  if (!config.headers) {
    return config;
  }
  if (config.url === '/users' && config.method === 'post') {
    return config;
  }
  // 여기서 userId를 가져와야 한다고 가정합니다. 예를 들어, 현재 사용자의 userId를 가져오는 함수를 호출한다고 가정합니다.
  const userId = await getUserId();

  // config.headers에 userId를 추가합니다.
  config.headers['userId'] = userId;

  return config;
});

// 사용자의 userId를 가져오는 함수 (임시)
async function getUserId() {
  const userId = await AsyncStorage.getItem('userId');
  return userId;
}

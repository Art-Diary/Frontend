import axios from 'axios';

export const client = axios.create({
  //   baseURL: process.env.PUBLIC_API_URL,
  baseURL: 'http://wifi ip 주소:8080',
  timeout: 2000,
});

client.interceptors.request.use(async config => {
  // 여기서 userId를 가져와야 한다고 가정합니다. 예를 들어, 현재 사용자의 userId를 가져오는 함수를 호출한다고 가정합니다.
  const userId = await getUserId();

  // config.headers에 userId를 추가합니다.
  config.headers['userId'] = userId;

  return config;
});

// 사용자의 userId를 가져오는 함수 (임시)
async function getUserId() {
  return 3;
}

import {LinkingOptions} from '@react-navigation/native';
import {RootStackParamList} from './stackTypes';
import {Linking} from 'react-native';

export const DEEPLINK_PREFIX_URL = ['artdiary://'];

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: DEEPLINK_PREFIX_URL,
  config: {
    screens: {
      ExhDetailInfo: 'exhibition/:exhId',
      GatheringRoutes: {
        screens: {
          GatheringInfo: 'gathering/:gatherId', // GatheringInfo 화면으로의 경로 설정
        },
      },
      Main: {
        screens: {
          Calendar: 'calendar',
        },
      },
    },
  },
  async getInitialURL() {
    // 딥링크를 이용해서 앱이 오픈되었을 때
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};

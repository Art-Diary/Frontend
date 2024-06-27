/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from '~/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import pushNoti from '~/utils/pushNoti';
import notifee, {EventDetail, EventType} from '@notifee/react-native';

const handlePressNotification = async (detail: EventDetail) => {
  // 처리할 이벤트 추가
  if (detail.notification?.data) {
    const exhId = detail.notification?.data.exhId;
    await Linking.openURL(`artdiary://exhibition/${exhId}`);
  }
};

const handleDismissedNotification = (detail: EventDetail) => {
  // noti 삭제
  if (detail.notification?.id) {
    notifee.cancelNotification(detail.notification.id);
    notifee.cancelDisplayedNotification(detail.notification.id);
  }
};

notifee.onForegroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    handlePressNotification(detail);
  } else if (type === EventType.DISMISSED) {
    handleDismissedNotification(detail);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    handlePressNotification(detail);
  } else if (type === EventType.DISMISSED) {
    handleDismissedNotification(detail);
  }
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await pushNoti.displayNoti(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);

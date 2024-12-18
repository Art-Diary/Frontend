import notifee, {AndroidImportance} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

const displayNotification = async (
  message: FirebaseMessagingTypes.RemoteMessage,
) => {
  const channelAnoucement = await notifee.createChannel({
    id: 'default',
    name: '카테고리 이름',
    importance: AndroidImportance.HIGH,
  });

  if (!message.data) {
    return;
  }
  const titleData = message.data.title.toString();
  const title = titleData.split('/')[0];
  const body = message.data.body.toString();
  const type: string = titleData.split('/')[1].split('-')[0];
  var value: number | undefined | string = undefined;

  if (type === 'calendar') {
    value = body.split('에')[0];
  } else {
    value = Number(titleData.split('/')[1].split('-')[1]);
  }

  await notifee.displayNotification({
    title: title,
    body: body,
    data: {
      info: {
        type: type,
        id: value,
      },
    },
    android: {
      channelId: channelAnoucement,
      showTimestamp: true,
      smallIcon: 'ic_launcher',
    },
  });
};

export default {
  displayNoti: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) =>
    displayNotification(remoteMessage),
};

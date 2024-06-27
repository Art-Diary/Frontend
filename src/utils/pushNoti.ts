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

  const titleData = message.data?.title.toString();
  const title = titleData?.split('/')[0];
  const exhId = Number(titleData?.split('/')[1]);

  await notifee.displayNotification({
    title: title,
    body: message.data?.body.toString(),
    data: {exhId: exhId},
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

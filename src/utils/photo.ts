import {PermissionsAndroid, Platform} from 'react-native';

export const requestCameraPermission = async () => {
  const sdkVersion = Number(Platform.Version);

  if (Platform.OS === 'android') {
    if (sdkVersion >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      if (result === 'granted') {
        console.log('READ_MEDIA_IMAGES is granted.');
        return true;
      } else {
        console.log('READ_MEDIA_IMAGES is denied.');
        return false;
      }
    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (result === 'granted') {
        console.log('READ_EXTERNAL_STORAGE is granted.');
        return true;
      } else {
        console.log('READ_EXTERNAL_STORAGE is denied.');
        return false;
      }
    }
  }
};

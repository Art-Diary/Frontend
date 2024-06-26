import {Alert, Platform} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {RichEditor} from 'react-native-pell-rich-editor';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(result => {
        if (result === RESULTS.DENIED || result === RESULTS.GRANTED) {
          return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        } else {
          console.log(result);
          throw new Error('카메라 지원 안 함');
        }
      })
      .catch(console.error);
  }
};

export const showPhoto = async (editorRef: React.RefObject<RichEditor>) => {
  await requestCameraPermission();

  const option: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };
  const response = await launchImageLibrary(option);

  if (response.errorMessage) {
    Alert.alert('Error : ' + response.errorMessage);
  } else {
    const uris: Asset[] = [];

    response.assets?.forEach(value => uris.push(value));

    const imageUri = uris[0].uri;
    if (imageUri) {
      const imageData = await RNFS.readFile(imageUri, 'base64');
      const base64Uri = `data:image/jpeg;base64,${imageData}`;
      if (editorRef.current) {
        editorRef.current?.insertImage(base64Uri, 'width: 100%; height: auto;');
      }
    }
  }
};

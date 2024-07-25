import {Alert, Linking} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {RichEditor} from 'react-native-pell-rich-editor';
import {ImageType} from './WriteMyDiaryContentsScreen';
import {showToast} from '~/components/common/modal/toastConfig';
import {requestCameraPermission} from '~/utils/photo';

export const showPhoto = async (
  editorRef: React.RefObject<RichEditor>,
  setImages: (info: ImageType[]) => void,
  images: ImageType[],
) => {
  const result = await requestCameraPermission();

  if (!result) {
    Linking.openSettings().catch(() => {
      showToast('설정으로 이동할 수 없습니다.');
    });
    return;
  }

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
        setImages([...images, {uri: imageUri, base64: base64Uri}]);
        editorRef.current?.insertImage(base64Uri, 'width: 100%; height: auto;');
      }
    }
  }
};

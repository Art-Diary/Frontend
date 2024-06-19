import {PROJECT_PACKAGE_NAME, SHARE_DOMAIN_URI_PREFIX, SHARE_LINK} from '@env';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import storage from '@react-native-firebase/storage';

const imageUpload = async (poster: string, exhId: number) => {
  try {
    // const reference = storage().ref(`/exhibition/${exhId}`); // 업로드할 경로 지정
    // if (Platform.OS === 'android') {
    //   // 안드로이드
    //   // 파일 업로드
    //   await reference.putString(poster, 'base64', {
    //     contentType: 'png',
    //   });
    // } else {
    //   // iOS
    //   // 파일 업로드
    //   await reference.putFile(asset.uri);
    // }

    // TODO 추후 전시회 이미지 저장 및 사용
    const reference = storage().ref(`/exhibition/${exhId}`); // 업로드할 경로 지정
    const imageUrl = await reference.getDownloadURL();

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
};

export const createDynamicLink = async (
  poster: string,
  exhId: number,
  exhName: string,
) => {
  try {
    // 1. base64 이미지를 Firebase Storage에 업로드
    const imageUrl = await imageUpload(poster, exhId);

    // 2. Dynamic Link 생성
    const link = await dynamicLinks().buildShortLink(
      {
        link: `${SHARE_LINK}?exhId=${exhId}`,
        domainUriPrefix: `${SHARE_DOMAIN_URI_PREFIX}`,
        android: {
          packageName: `${PROJECT_PACKAGE_NAME}`,
          minimumVersion: '1',
        },
        ios: {
          bundleId: `${PROJECT_PACKAGE_NAME}`,
          appStoreId: '123456789',
        },
        social: {
          title: 'Art Diary',
          descriptionText: `함께 가고픈 전시회 "${exhName}"`,
          imageUrl: imageUrl,
        },
      },
      dynamicLinks.ShortLinkType.UNGUESSABLE,
    );

    return link;
  } catch (error) {
    console.error('Error creating dynamic link:', error);
    throw error;
  }
};

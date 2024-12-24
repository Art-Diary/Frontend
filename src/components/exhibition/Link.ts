import {
  DEFAULT_IMAGE,
  PROJECT_PACKAGE_NAME,
  SHARE_DOMAIN_URI_PREFIX,
  SHARE_LINK,
} from '@env';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const createDynamicLink = async (
  poster: string,
  exhId: number,
  exhName: string,
) => {
  try {
    const imageURl = poster ?? DEFAULT_IMAGE;

    //  Dynamic Link 생성
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
          imageUrl: imageURl,
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

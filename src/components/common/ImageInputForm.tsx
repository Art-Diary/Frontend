import React from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  MAIN_COLOR,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import CustomTouchable from './CustomTouchable';
import {CameraButtonIcon, ThumbnailTrashRegExhIcon} from './icon';
import {requestCameraPermission} from '~/utils/photo';
import {Alert, Image, Linking} from 'react-native';
import {showToast} from './modal/toastConfig';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

interface ImageInputFormProps {
  title: string;
  isEssential?: boolean;
  image: string | undefined;
  handleImage: (image: string | undefined) => void;
}

const ImageInputForm: React.FC<ImageInputFormProps> = ({
  title,
  isEssential,
  image,
  handleImage,
}) => {
  const onClickTrash = async () => {
    handleImage(undefined);
  };

  const showPhoto = async () => {
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

      handleImage(imageUri);
    }
  };

  return (
    <Container>
      {/* section 제목 */}
      <CountWrapper>
        <SectionWapper>
          {isEssential && <SectionStar>*</SectionStar>}
          <SectionName>{title}</SectionName>
        </SectionWapper>
        {image && (
          <CustomTouchable onPress={onClickTrash}>
            <ThumbnailTrashRegExhIcon />
          </CustomTouchable>
        )}
      </CountWrapper>
      {/* section 내용 */}
      <ImageWapper>
        {!image ? (
          <CustomTouchable style={{padding: 30}} onPress={showPhoto}>
            <CameraButtonIcon />
          </CustomTouchable>
        ) : (
          <CustomTouchable
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
            onPress={showPhoto}>
            <Image
              source={{uri: image}}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
              resizeMode="contain"
            />
          </CustomTouchable>
        )}
      </ImageWapper>
    </Container>
  );
};

export default ImageInputForm;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
  gap: ${hp(1.3)}px;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const CountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
  justify-content: space-between;
  padding-right: ${wp(2)}px;
`;

const SectionWapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${wp(1)}px;
`;

const SectionStar = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MAIN_COLOR};
  text-align: center;
`;

const ImageWapper = styled.View`
  flex: 1;
  background-color: ${TEXTINPUTFORM_COLOR};
  align-items: center;
  justify-content: center;
  min-height: ${hp(43.5)}px;
  border-radius: ${BUTTON_RADIUS}px;
`;

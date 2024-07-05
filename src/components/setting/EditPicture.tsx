import React from 'react';
import {Alert, Image, Platform, TouchableOpacity} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DEFAULT_TEXT, LIGHT_GREY} from '../common/colors';
import {AREA_FONT_SIZE, FONT_NAME} from '../common/style';
import {CameraButtonIcon} from '../common/icon';

interface EditNicknameProps {
  imageUri: string | undefined;
  setImageUri: (uri: string | undefined) => void;
}

const EditPicture: React.FC<EditNicknameProps> = ({imageUri, setImageUri}) => {
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

  const showPhoto = async () => {
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

      setImageUri(imageUri);
    }
  };

  return (
    <ContentColumn>
      <SectionView>
        <SectionName main={true}>프로필</SectionName>
        <SectionName main={false}> (선택)</SectionName>
      </SectionView>
      <ProfileSection>
        <PutProfile>
          {imageUri === undefined ? (
            <TouchableOpacity style={{padding: 30}} onPress={showPhoto}>
              <CameraButtonIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
              onPress={showPhoto}>
              <Image
                source={{uri: imageUri}}
                style={{width: '100%', height: '100%', alignItems: 'center'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </PutProfile>
      </ProfileSection>
    </ContentColumn>
  );
};

export default EditPicture;

const ContentColumn = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${hp(1.7)}px;
`;

const SectionView = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface SectionNameProps {
  main: boolean;
}

const SectionName = styled.Text<SectionNameProps>`
  font-size: ${(props: SectionNameProps) =>
    props.main ? `${AREA_FONT_SIZE}px` : `${rf(14.5)}px`};
  color: ${(props: SectionNameProps) =>
    props.main ? `${DEFAULT_TEXT}` : `${LIGHT_GREY}`};
  font-family: ${FONT_NAME};
`;

const ProfileSection = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-width: ${wp(0.3)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${wp(2)}px;
  padding: ${wp(2.7)}px;
`;

const PutProfile = styled.View`
  flex: 1;
  background-color: rgba(217, 217, 217, 0.3);
  align-items: center;
  justify-content: center;
`;

import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Platform, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import BackView from '~/components/common/BackView';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {RootStackNavigationProp} from '~/App';
import {checkBlankInKeyword} from '~/utils/CheckKeyword';
import {
  CameraButtonIcon,
  EmptyStarIcon,
  FullStarIcon,
  PrivateToggleIcon,
  PublicToggleIcon,
} from '~/components/common/icon';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';

const WriteMyDiaryInfoScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [starNum, setStarNum] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [sayingKeyword, setSayingKeyword] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const {updateforDetailInfo} = useWriteMyDiaryActions();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();

  useEffect(() => {
    if (writeMyDiaryInfo.isUpdate) {
      setTitleKeyword(writeMyDiaryInfo.title ?? '');
      setStarNum(writeMyDiaryInfo.rate ?? 0.0);
      setIsPublic(writeMyDiaryInfo.diaryPrivate ?? true);
      setSayingKeyword(writeMyDiaryInfo.saying ?? '');
      // thumbnail
      setImageUri(`data:image/png;base64,${writeMyDiaryInfo.thumbnail}`);
    } else {
      setTitleKeyword('');
      setStarNum(0.0);
      setIsPublic(true);
      setSayingKeyword('');
      // thumbnail
      setImageUri(undefined);
    }
  }, []);

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

  const changeStarNum = (num: number) => {
    setStarNum(num);
  };

  const changeToggle = () => {
    setIsPublic(!isPublic);
  };

  const onChangeTitle = useCallback((text: string) => {
    setTitleKeyword(text);
  }, []);

  const onChangeSaying = useCallback((text: string) => {
    setSayingKeyword(text);
  }, []);

  const onClickNextButton = async () => {
    const today = new Date();
    const dateList = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];
    updateforDetailInfo(
      titleKeyword,
      starNum,
      isPublic,
      imageUri ?? null,
      dateList,
      sayingKeyword,
    );
    // 기록 내용 작성 페이지로 이동
    navigation.navigate('WriteMyDiaryContents');
  };

  return (
    <Container>
      <BackView title="기록 작성" line={true} children={null} />
      <ContentsContainer>
        {/* 기록 정보 작성 */}
        <WriteTitle
          placeholderTextColor="#D3D3D3"
          placeholder={'제목'}
          onChangeText={onChangeTitle}
          value={titleKeyword}
        />
        <SecondSection>
          <HalfSection>
            <SectionName>별점</SectionName>
            <StarList>
              <TouchableOpacity onPress={() => changeStarNum(1)}>
                {starNum >= 1 ? <FullStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(2)}>
                {starNum >= 2 ? <FullStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(3)}>
                {starNum >= 3 ? <FullStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(4)}>
                {starNum >= 4 ? <FullStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeStarNum(5)}>
                {starNum >= 5 ? <FullStarIcon /> : <EmptyStarIcon />}
              </TouchableOpacity>
            </StarList>
          </HalfSection>
          <HalfSection>
            <SectionName>공개 여부</SectionName>
            <TouchableOpacity onPress={changeToggle}>
              {isPublic ? <PublicToggleIcon /> : <PrivateToggleIcon />}
            </TouchableOpacity>
          </HalfSection>
        </SecondSection>
        <SayingSection>
          <SectionName>한마디</SectionName>
          <WriteSayingSection>
            <SectionName>"</SectionName>
            <WriteSaying
              placeholderTextColor={LIGHT_GREY}
              placeholder={!sayingKeyword ? '한마디' : ''}
              value={sayingKeyword}
              onChangeText={onChangeSaying}
            />
            <SectionName>"</SectionName>
          </WriteSayingSection>
        </SayingSection>
        <ThumbnailSection>
          <SectionName>대표사진</SectionName>
          <PutThumbnail>
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
          </PutThumbnail>
        </ThumbnailSection>
        {/* 다음 버튼 */}
        {!checkBlankInKeyword(titleKeyword) && starNum > 0 ? (
          <TouchableOpacity onPress={onClickNextButton}>
            <NextButton moveNext={true}>다음</NextButton>
          </TouchableOpacity>
        ) : (
          <NextButton moveNext={false}>다음</NextButton>
        )}
      </ContentsContainer>
    </Container>
  );
};

export default WriteMyDiaryInfoScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

const ContentsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  padding-top: ${hp(1.6)}px;
  padding-bottom: ${hp(1.6)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

const WriteTitle = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
`;

const SecondSection = styled.View`
  width: 100%;
  flex-direction: row;
  gap: ${wp(2.9)}px;
`;

const HalfSection = styled.View`
  flex: 1;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 50%;
  padding: ${wp(2.9)}px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
`;

const StarList = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SayingSection = styled.View`
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

const WriteSayingSection = styled.View`
  flex-direction: row;
`;

const WriteSaying = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  max-width: 97%;
`;

const ThumbnailSection = styled.View`
  flex: 1;
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

const PutThumbnail = styled.View`
  flex: 1;
  background-color: rgba(217, 217, 217, 0.3);
  align-items: center;
  justify-content: center;
`;

interface NextButtonProps {
  moveNext: boolean;
}

const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.moveNext ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

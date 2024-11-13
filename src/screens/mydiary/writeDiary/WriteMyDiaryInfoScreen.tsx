import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Linking} from 'react-native';
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
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';
import {RootStackNavigationProp} from '~/App';
import {checkBlankInKeyword} from '~/utils/keyword';
import {
  CameraButtonIcon,
  EmptyStarIcon,
  FullStarIcon,
  PrivateToggleIcon,
  PublicToggleIcon,
  ThumbnailTrashRegExhIcon,
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
import CustomTouchable from '~/components/common/CustomTouchable';
import {showToast} from '~/components/common/modal/toastConfig';
import {requestCameraPermission} from '~/utils/photo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// [WORD_LIMIT]
const WriteMyDiaryInfoScreen = () => {
  const titleMaxInputLength = 20;
  const sayingMaxInputLength = 60;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [titleKeyword, setTitleKeyword] = useState<string>('');
  const [starNum, setStarNum] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [sayingKeyword, setSayingKeyword] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const {
    updateforDetailInfo,
    updateTitle,
    updateRate,
    updateDiaryPrivate,
    updateThumbnail,
    updateSaying,
  } = useWriteMyDiaryActions();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();

  useEffect(() => {
    setTitleKeyword(writeMyDiaryInfo.title ?? '');
    setStarNum(writeMyDiaryInfo.rate ?? 0.0);
    setIsPublic(writeMyDiaryInfo.diaryPrivate ?? true);
    setSayingKeyword(writeMyDiaryInfo.saying ?? '');
    // thumbnail
    setImageUri(writeMyDiaryInfo.thumbnail ?? undefined);
  }, []);

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

      setImageUri(imageUri);
      updateThumbnail(imageUri ?? null);
    }
  };

  const changeStarNum = (num: number) => {
    setStarNum(num);
    updateRate(num);
  };

  const changeToggle = () => {
    updateDiaryPrivate(!isPublic);
    setIsPublic(!isPublic);
  };

  const onChangeTitle = useCallback((text: string) => {
    setTitleKeyword(text);
    updateTitle(text);
  }, []);

  const onChangeSaying = useCallback((text: string) => {
    setSayingKeyword(text);
    updateSaying(text);
  }, []);

  const onClickNextButton = async () => {
    if (checkBlankInKeyword(titleKeyword)) {
      showToast('제목 작성해주세요.');
      return;
    }
    if (starNum == 0) {
      showToast('별점 선택해주세요.');
      return;
    }
    if (!sayingKeyword || checkBlankInKeyword(sayingKeyword)) {
      showToast('한마디 작성해주세요.');
      return;
    }
    updateforDetailInfo(
      titleKeyword,
      starNum,
      isPublic,
      imageUri ?? null,
      sayingKeyword,
    );
    // 기록 내용 작성 페이지로 이동
    navigation.navigate('WriteMyDiaryContents');
  };

  const onClickTrash = async () => {
    setImageUri(undefined);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: BACK_COLOR}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <BackView title="기록 작성" line={true} children={null} />
        <ContentsContainer>
          {/* 기록 정보 작성 */}
          <TitleSection>
            <CountWrapper>
              <SectionWapper>
                <SectionStar>*</SectionStar>
                <SectionName>제목</SectionName>
              </SectionWapper>
              <CountText>
                ( {titleKeyword ? titleKeyword.length : 0} /{' '}
                {titleMaxInputLength} )
              </CountText>
            </CountWrapper>
            <WriteSaying
              multiline={true}
              maxLength={titleMaxInputLength}
              placeholderTextColor={LIGHT_GREY}
              placeholder={!titleKeyword ? '제목' : ''}
              value={titleKeyword}
              onChangeText={onChangeTitle}
            />
          </TitleSection>
          <SecondSection>
            <HalfSection>
              <SectionWapper>
                <SectionStar>*</SectionStar>
                <SectionName>별점</SectionName>
              </SectionWapper>
              <StarList>
                <CustomTouchable onPress={() => changeStarNum(1)}>
                  {starNum >= 1 ? <FullStarIcon /> : <EmptyStarIcon />}
                </CustomTouchable>
                <CustomTouchable onPress={() => changeStarNum(2)}>
                  {starNum >= 2 ? <FullStarIcon /> : <EmptyStarIcon />}
                </CustomTouchable>
                <CustomTouchable onPress={() => changeStarNum(3)}>
                  {starNum >= 3 ? <FullStarIcon /> : <EmptyStarIcon />}
                </CustomTouchable>
                <CustomTouchable onPress={() => changeStarNum(4)}>
                  {starNum >= 4 ? <FullStarIcon /> : <EmptyStarIcon />}
                </CustomTouchable>
                <CustomTouchable onPress={() => changeStarNum(5)}>
                  {starNum >= 5 ? <FullStarIcon /> : <EmptyStarIcon />}
                </CustomTouchable>
              </StarList>
            </HalfSection>
            <HalfSection>
              <SectionName>공개 여부</SectionName>
              <CustomTouchable onPress={changeToggle}>
                {isPublic ? <PublicToggleIcon /> : <PrivateToggleIcon />}
              </CustomTouchable>
            </HalfSection>
          </SecondSection>
          <SayingSection>
            <CountWrapper>
              <SectionWapper>
                <SectionStar>*</SectionStar>
                <SectionName>한마디</SectionName>
              </SectionWapper>
              <CountText>
                ( {sayingKeyword ? sayingKeyword.length : 0} /{' '}
                {sayingMaxInputLength} )
              </CountText>
            </CountWrapper>
            <WriteSayingSection>
              <SectionName>"</SectionName>
              <WriteSaying
                multiline={true}
                maxLength={sayingMaxInputLength}
                placeholderTextColor={LIGHT_GREY}
                placeholder={!sayingKeyword ? '한마디' : ''}
                value={sayingKeyword}
                onChangeText={onChangeSaying}
              />
              <SectionName>"</SectionName>
            </WriteSayingSection>
          </SayingSection>
          <ThumbnailSection>
            <SectionWapper>
              <SectionName>대표사진</SectionName>
              {imageUri && (
                <CustomTouchable onPress={onClickTrash}>
                  <ThumbnailTrashRegExhIcon />
                </CustomTouchable>
              )}
            </SectionWapper>
            <PutThumbnail>
              {!imageUri ? (
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
                    source={{uri: imageUri}}
                    style={{
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                    }}
                    resizeMode="contain"
                  />
                </CustomTouchable>
              )}
            </PutThumbnail>
          </ThumbnailSection>
          {/* 다음 버튼 */}
          <CustomTouchable onPress={onClickNextButton}>
            <NextButton moveNext={true}>다음</NextButton>
          </CustomTouchable>
        </ContentsContainer>
      </Container>
    </KeyboardAwareScrollView>
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
  width: 80%;
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

const TitleSection = styled.View`
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1)}px;
`;

const SayingSection = styled.View`
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1)}px;
`;

const WriteSayingSection = styled.View`
  flex-direction: row;
`;

const WriteSaying = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
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
  min-height: ${hp(43.5)}px;
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

const WriteTitleWrapper = styled.View`
  flex-direction: row;
  border-width: ${wp(0.3)}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${wp(2)}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
`;

const CountText = styled.Text`
  font-size: ${rf(16)}px;
  font-family: ${FONT_NAME};
  color: ${MIDDLE_GREY};
  text-align: center;
`;

const CountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${wp(1)}px;
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

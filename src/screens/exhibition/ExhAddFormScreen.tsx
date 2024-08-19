import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import CustomTouchable from '~/components/common/CustomTouchable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
} from '~/components/common/colors';
import BackView from '~/components/common/BackView';
import {CameraButtonIcon} from '~/components/common/icon';
import {Alert, Image, Linking} from 'react-native';
import {checkBlankInKeyword} from '~/utils/keyword';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import {requestCameraPermission} from '~/utils/photo';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useAddExhibitionActions} from '~/zustand/exhibition/addExhibition';

const ExhAddFormScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const feeMaxInputLength = 10;
  const [regExhNameKeyword, setRegExhNameKeyword] = useState<string>('');
  const [regGalleryKeyword, setRegGallery] = useState<string>('');
  const [regStartDateKeyword, setStartDateGallery] = useState<string>('');
  const [regEndDateKeyword, setEndDateGallery] = useState<string>('');
  const [regPainterKeyword, setRegPainterKeyword] = useState<string>('');
  const [regFeeKeyword, setRegFeeKeyword] = useState<string>('');
  const [regUrlKeyword, setRegUrlKeyword] = useState<string | undefined>(
    undefined,
  );
  const [regIntroKeyword, setRegIntroKeyword] = useState<string | undefined>(
    undefined,
  );
  const [regPosterUri, setRegPosterUri] = useState<string | undefined>(
    undefined,
  );
  const {updateRegExhData} = useAddExhibitionActions();
  // create api

  const onChangeExhName = useCallback((text: string) => {
    setRegExhNameKeyword(text);
  }, []);

  const onChangePainter = useCallback((text: string) => {
    setRegPainterKeyword(text);
  }, []);

  const onChangeFee = useCallback((text: string) => {
    setRegFeeKeyword(text);
  }, []);

  const onChangeIntro = useCallback((text: string) => {
    setRegIntroKeyword(text);
  }, []);

  const onChangeUrl = useCallback((text: string) => {
    setRegUrlKeyword(text);
  }, []);

  const openSearchGalleryModal = () => {};

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

      setRegPosterUri(imageUri);
    }
  };

  const checkFeeNumber = (regFee: string) => {
    if (checkBlankInKeyword(regFee)) {
      return false;
    }
    try {
      Number(regFee);
    } catch (e) {
      return false;
    }
    return true;
  };

  const checkForm = () => {
    // 전시회 이름
    if (checkBlankInKeyword(regExhNameKeyword)) {
      showToast('전시회 제목을 입력해주세요.');
      return;
    }
    // 전시회 장소 -
    if (checkBlankInKeyword(regGalleryKeyword)) {
      showToast('전시회 장소를 선택해주세요.');
      return;
    }
    // 전시회 일정 -
    if (checkBlankInKeyword(regExhNameKeyword)) {
      showToast('전시회 일정을 입력해주세요.');
      return;
    }
    // 전시회 작가
    if (checkBlankInKeyword(regPainterKeyword)) {
      showToast('전시회 작가를 입력해주세요.');
      return;
    }
    // 전시회 관람료
    if (!checkFeeNumber(regFeeKeyword)) {
      showToast('전시회 관람료를 입력해주세요.');
      return;
    }
    // 전시회 홈페이지 링크
    if (regUrlKeyword && checkBlankInKeyword(regUrlKeyword)) {
      showToast('전시회 홈페이지 링크를 확인해주세요.');
      return;
    }
    // 전시회 소개글
    if (regIntroKeyword && checkBlankInKeyword(regIntroKeyword)) {
      showToast('전시회 소개글을 확인해주세요.');
      return;
    }
    // 포스터
    if (!regPosterUri) {
      showToast('전시회 포스터를 첨부해주세요.');
      return;
    }
    updateRegExhData({
      regExhName: regExhNameKeyword,
      regGallery: '알 수 없음',
      regExhPeriodStart: '2024-08-01', //
      regExhPeriodEnd: '2024-08-30', //
      regPainter: regPainterKeyword,
      regFee: Number(regFeeKeyword),
      regIntro: regIntroKeyword,
      regUrl: regUrlKeyword,
      regPoster: regPosterUri,
      regArt: undefined,
      regDate: '2024-08-30', //
    });
    // navigation.navigate(); // 설정 페이지의 등록한 전시회 페이지로 이동
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: BACK_COLOR}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}>
      <Container>
        <BackView title="전시회 등록" line={true} children={null} />
        <ContentsContainer>
          {/* 전시회 제목 */}
          <RowSectionWrapper sectionName={'exhName'}>
            <WriteInfo
              multiline={true}
              placeholderTextColor={LIGHT_GREY}
              placeholder={'전시회 제목 (정확한 전시명 표기)'}
              value={regExhNameKeyword}
              onChangeText={onChangeExhName}
            />
          </RowSectionWrapper>
          {/* 전시회 제목 */}
          <RowSectionWrapper>
            <SectionName>전시회 장소 추가</SectionName>
            <SectionName>장소 선택 구현 예정</SectionName>
          </RowSectionWrapper>
          {/* 전시회 제목 */}
          <RowSectionWrapper>
            <SectionName>전시회 일정</SectionName>
            <SectionName>일정 선택 구현 예정</SectionName>
          </RowSectionWrapper>
          {/* 전시회 제목 */}
          <ColSectionWrapper>
            <SectionName>전시회 작가</SectionName>
            <RowSectionWrapper sectionName={'painter'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'작가 입력'}
                value={regPainterKeyword}
                onChangeText={onChangePainter}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 제목 */}
          <RowSectionWrapper>
            <SectionName>전시회 관람료</SectionName>
            <FeeWrapper>
              <WriteInfo
                keyboardType="numeric"
                maxLength={feeMaxInputLength}
                placeholderTextColor={DEFAULT_TEXT}
                placeholder={'-'}
                onChangeText={onChangeFee}
                value={regFeeKeyword}
              />
              <SectionName>원</SectionName>
            </FeeWrapper>
          </RowSectionWrapper>
          {/* 전시회 제목 */}
          <ColSectionWrapper>
            <SectionName>전시회 홈페이지 링크</SectionName>
            <RowSectionWrapper sectionName={'url'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'홈페이지 링크 입력'}
                value={regUrlKeyword}
                onChangeText={onChangeUrl}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 제목 */}
          <ColSectionWrapper>
            <SectionName>소개</SectionName>
            <WriteIntroWrapper>
              <SectionName>"</SectionName>
              <WriteInfo
                sectionName={'intro'}
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={!regIntroKeyword ? '소개글 입력' : ''}
                value={regIntroKeyword}
                onChangeText={onChangeIntro}
              />
              <SectionName>"</SectionName>
            </WriteIntroWrapper>
          </ColSectionWrapper>
          {/* 전시회 제목 */}
          <ColSectionWrapper>
            <SectionName>포스터</SectionName>
            <PutThumbnail>
              {!regPosterUri ? (
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
                    source={{uri: regPosterUri}}
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
          </ColSectionWrapper>
          {/* 확인 버튼 */}
          <CustomTouchable onPress={checkForm}>
            <ConfirmButton>확인</ConfirmButton>
          </CustomTouchable>
        </ContentsContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default ExhAddFormScreen;

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

const SectionName = styled.Text`
  font-size: ${AREA_FONT_SIZE}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const FeeWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WriteIntroWrapper = styled.View`
  flex-direction: row;
`;

const PutThumbnail = styled.View`
  flex: 1;
  background-color: rgba(217, 217, 217, 0.3);
  align-items: center;
  justify-content: center;
  min-height: ${hp(35)}px;
`;

const ConfirmButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

// Section

interface SectionProps {
  sectionName: string;
}

const RowSectionWrapper = styled.View<SectionProps>`
  flex-direction: row;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
  padding-top: ${(props: SectionProps) =>
    props.sectionName === 'exhName' ||
    props.sectionName === 'url' ||
    props.sectionName === 'painter'
      ? `0px`
      : `${wp(2.9)}px`};
  padding-bottom: ${(props: SectionProps) =>
    props.sectionName === 'exhName' ||
    props.sectionName === 'url' ||
    props.sectionName === 'painter'
      ? `0px`
      : `${wp(2.9)}px`};
`;

const ColSectionWrapper = styled.View`
  flex-direction: column;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  width: 100%;
  padding: ${wp(2.9)}px;
  gap: ${hp(1.6)}px;
`;

// TextInput

const WriteInfo = styled.TextInput<SectionProps>`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  max-width: ${(props: SectionProps) =>
    props.sectionName === 'intro' ? `97%` : `100%`};
`;

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
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
  MIDDLE_GREY,
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
import {changeImageSize} from '~/utils/resizeImage';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {changeDotToHyphen} from '~/utils/date';
import ExhSelectPeriod from '~/screens/exhibition/ExhSelectPeriodModal';

type RegExhDataSetType = {
  regExhName: string;
  setRegExhName: (name: string) => void;
  regGallery: string;
  setRegGallery: (name: string) => void;
  regStartDate: string;
  setRegStartDate: (name: string) => void;
  regEndDate: string;
  setRegEndDate: (name: string) => void;
  regPainter: string;
  setRegPainter: (name: string) => void;
  regFee: string;
  setRegFee: (name: string) => void;
  regUrl: string | undefined;
  setRegUrl: (name: string | undefined) => void;
  regIntro: string | undefined;
  setRegIntro: (name: string | undefined) => void;
  regPosterUri: string | undefined;
  setRegPosterUri: (name: string | undefined) => void;
};

type RequestApiType = {
  isLoading: boolean;
  createApi?: (formData: FormData | null) => void;
  // 사용자 업데이트 api
  // 관리자 업데이트 api
};

interface RegExhFormFrameProps {
  children?: ReactNode;
  formState: 'create' | 'updateByUser' | 'updateByAdmin';
  regExhData: RegExhDataSetType;
  requestData: RequestApiType;
}

const RegExhFormFrame: React.FC<RegExhFormFrameProps> = ({
  children,
  formState,
  regExhData,
  requestData,
}) => {
  const feeMaxInputLength = 10;
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // 일정 선택 모달

  useEffect(() => {
    if (requestData.isLoading) {
      setIsLoadingOpen(true);
    }
    if (!requestData.isLoading) {
      setIsLoadingOpen(false);
    }
  }, [requestData.isLoading]);

  const onChangeExhName = useCallback((text: string) => {
    regExhData.setRegExhName(text);
  }, []);

  const onChangePainter = useCallback((text: string) => {
    regExhData.setRegPainter(text);
  }, []);

  const onChangeFee = useCallback((text: string) => {
    regExhData.setRegFee(text);
  }, []);

  const onChangeIntro = useCallback((text: string) => {
    regExhData.setRegIntro(text);
  }, []);

  const onChangeUrl = useCallback((text: string) => {
    regExhData.setRegUrl(text);
  }, []);

  // TODO 구현 예정
  const openSearchGalleryModal = () => {};

  const handleCloseSelectPeriodModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenSelectPeriodModal = () => {
    setIsModalVisible(true);
  };

  const handleSelectedPeriod = (startDate: string, endDate: string) => {
    regExhData.setRegStartDate(startDate);
    regExhData.setRegEndDate(endDate);
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

      regExhData.setRegPosterUri(imageUri);
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
    if (checkBlankInKeyword(regExhData.regExhName)) {
      showToast('전시회 제목을 입력해주세요.');
      return;
    }
    // TODO 구현 예정
    // if (checkBlankInKeyword(regGalleryKeyword)) {
    //   showToast('전시회 장소를 선택해주세요.');
    //   return;
    // }
    // 전시회 일정
    if (regExhData.regStartDate === '' || regExhData.regEndDate === '') {
      showToast('전시회 일정을 선택해주세요.');
      return;
    }
    // 전시회 작가
    if (checkBlankInKeyword(regExhData.regPainter)) {
      showToast('전시회 작가를 입력해주세요.');
      return;
    }
    // 전시회 관람료
    if (!checkFeeNumber(regExhData.regFee)) {
      showToast('전시회 관람료를 입력해주세요.');
      return;
    }
    // 전시회 홈페이지 링크
    if (regExhData.regUrl && checkBlankInKeyword(regExhData.regUrl)) {
      showToast('전시회 홈페이지 링크를 확인해주세요.');
      return;
    }
    // 전시회 소개글
    if (regExhData.regIntro && checkBlankInKeyword(regExhData.regIntro)) {
      showToast('전시회 소개글을 확인해주세요.');
      return;
    }
    // 포스터
    if (!regExhData.regPosterUri) {
      showToast('전시회 포스터를 첨부해주세요.');
      return;
    }
    makeFormData();
  };

  const makeFormData = async () => {
    const formData = new FormData();

    formData.append('regExhName', regExhData.regExhName);
    formData.append('regGallery', '알 수 없음');
    formData.append(
      'regExhPeriodStart',
      changeDotToHyphen(regExhData.regStartDate),
    );
    formData.append(
      'regExhPeriodEnd',
      changeDotToHyphen(regExhData.regEndDate),
    );
    formData.append('regPainter', regExhData.regPainter);
    formData.append('regFee', Number(regExhData.regFee));
    formData.append('regArt', undefined);
    formData.append('regDate', '2024-08-19 21:39:01');

    if (regExhData.regIntro) {
      formData.append('regIntro', regExhData.regIntro);
    }
    if (regExhData.regUrl) {
      formData.append('regUrl', regExhData.regUrl);
    }
    if (
      regExhData.regPosterUri &&
      regExhData.regPosterUri.indexOf('file:///') !== -1
    ) {
      const resultResizedImage = await changeImageSize(regExhData.regPosterUri);
      formData.append('regPoster', resultResizedImage);
    }
    if (formState === 'create' && requestData.createApi) {
      requestData.createApi(formData);
    } else if (formState === 'updateByUser') {
      // 사용자 업데이트
    } else {
      // 관리자 업데이트
    }
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
              value={regExhData.regExhName}
              onChangeText={onChangeExhName}
            />
          </RowSectionWrapper>
          {/* 전시회 장소 */}
          <RowSectionWrapper>
            <SectionName>전시회 장소</SectionName>
            <DateText>장소 선택 구현 예정</DateText>
          </RowSectionWrapper>
          {/* 전시회 일정 */}
          <CustomTouchable onPress={handleOpenSelectPeriodModal}>
            <RowSectionWrapper>
              <SectionName>전시회 일정</SectionName>
              {regExhData.regStartDate === '' ||
              regExhData.regEndDate === '' ? (
                <DateText>일정 선택</DateText>
              ) : (
                <DateText>
                  {regExhData.regStartDate} ~ {regExhData.regEndDate}
                </DateText>
              )}
            </RowSectionWrapper>
          </CustomTouchable>
          {isModalVisible && (
            <ExhSelectPeriod
              isVisible={isModalVisible}
              onClose={handleCloseSelectPeriodModal}
              startPeriod={regExhData.regStartDate}
              endPeriod={regExhData.regEndDate}
              handleSelectedPeriod={handleSelectedPeriod}
            />
          )}
          {/* 전시회 작가 */}
          <ColSectionWrapper>
            <SectionName>전시회 작가</SectionName>
            <RowSectionWrapper sectionName={'painter'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'작가 입력'}
                value={regExhData.regPainter}
                onChangeText={onChangePainter}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 관람료 */}
          <RowSectionWrapper>
            <SectionName>전시회 관람료</SectionName>
            <FeeWrapper>
              <WriteInfo
                keyboardType="numeric"
                maxLength={feeMaxInputLength}
                placeholderTextColor={DEFAULT_TEXT}
                placeholder={'-'}
                onChangeText={onChangeFee}
                value={regExhData.regFee}
              />
              <SectionName>원</SectionName>
            </FeeWrapper>
          </RowSectionWrapper>
          {/* 전시회 홈페이지 링크 */}
          <ColSectionWrapper>
            <SectionName>전시회 홈페이지 링크</SectionName>
            <RowSectionWrapper sectionName={'url'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'홈페이지 링크 입력'}
                value={regExhData.regUrl}
                onChangeText={onChangeUrl}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 소개 */}
          <ColSectionWrapper>
            <SectionName>소개</SectionName>
            <WriteIntroWrapper>
              <SectionName>"</SectionName>
              <WriteInfo
                sectionName={'intro'}
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={!regExhData.regIntro ? '소개글 입력' : ''}
                value={regExhData.regIntro}
                onChangeText={onChangeIntro}
              />
              <SectionName>"</SectionName>
            </WriteIntroWrapper>
          </ColSectionWrapper>
          {/* 전시회 포스터 */}
          <ColSectionWrapper>
            <SectionName>포스터</SectionName>
            <PutThumbnail>
              {!regExhData.regPosterUri ? (
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
                    source={{uri: regExhData.regPosterUri}}
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
          {children}
          {/* 확인 버튼 */}
          <CustomTouchable onPress={checkForm}>
            <ConfirmButton>확인</ConfirmButton>
          </CustomTouchable>
        </ContentsContainer>
      </Container>
      {isLoadingOpen && <LoadingModal message={'전시회 등록 요청 중 :)'} />}
    </KeyboardAwareScrollView>
  );
};

export default RegExhFormFrame;

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

const DateText = styled.Text`
  font-size: ${rf(15.5)}px;
  color: ${MIDDLE_GREY};
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

import React, {ReactNode, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
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
import {changeDateTimeFormat, changeDotToHyphen} from '~/utils/date';
import ExhSelectPeriod from './ExhSelectPeriodModal';
import {UpdateRegExhByAdminType, UpdateRegExhByUserType} from '~/api/regexh';
import {UpdateExhDetailType} from '~/api/exhibition';

type ExhDataSetType = {
  exhName: string;
  setExhName: (text: string) => void;
  gallery: string;
  setGallery: (text: string) => void;
  startDate: string;
  setStartDate: (text: string) => void;
  endDate: string;
  setEndDate: (text: string) => void;
  painter?: string;
  setPainter: (text: string) => void;
  fee: string;
  setFee: (text: string) => void;
  url: string | undefined;
  setUrl: (text: string | undefined) => void;
  intro: string | undefined;
  setIntro: (text: string | undefined) => void;
  posterUri: string | undefined;
  setPosterUri: (text: string | undefined) => void;
  regComment?: string | undefined; // 관리자 등록 전시회 업데이트일 경우에 해당
};

type CreateApiType = {
  setRegExhFormdata: (formData: FormData | null) => void;
  setIsPreviewModalOpen: (state: boolean) => void;
};

type UpdateByAdminApiType = {
  regExhId: number;
  updateByAdminApi: (updateData: UpdateRegExhByAdminType) => void;
};

type UpdateByUserApiType = {
  regExhId: number;
  updateByUserApi: (updateData: UpdateRegExhByUserType) => void;
};

type updateExhDetailByAdminApiType = {
  exhId: number;
  updateByAdminApi: (updateData: UpdateExhDetailType) => void;
};

type RequestApiType = {
  isLoading: boolean;
  // 사용자 추가 api
  createRequest?: CreateApiType;
  // 관리자 업데이트 api
  updateByAdminRequest?: UpdateByAdminApiType;
  // 사용자 업데이트 api
  updateByUserRequest?: UpdateByUserApiType;
  // 관리자의 전시회 상세 정보 업데이트 api
  updateExhDetailByAdminRequest?: updateExhDetailByAdminApiType;
  // - 추가는 여기에 추가해주세용
};

interface ExhFormFrameProps {
  children?: ReactNode;
  formState:
    | 'create'
    | 'updateByUser'
    | 'updateByAdmin'
    | 'updateExhDetailByAdmin';
  exhData: ExhDataSetType;
  requestData: RequestApiType;
}

const ExhFormFrame: React.FC<ExhFormFrameProps> = ({
  children,
  formState,
  exhData,
  requestData,
}) => {
  const feeMaxInputLength = 10;
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useState(false); // 일정 선택 모달

  useEffect(() => {
    if (requestData.isLoading) {
      setIsLoadingOpen(true);
    }
    if (!requestData.isLoading) {
      setIsLoadingOpen(false);
    }
  }, [requestData.isLoading]);

  const onChangeExhName = useCallback((text: string) => {
    exhData.setExhName(text);
  }, []);

  const onChangeGallery = useCallback((text: string) => {
    exhData.setGallery(text);
  }, []);

  const onChangePainter = useCallback((text: string) => {
    exhData.setPainter(text);
  }, []);

  const onChangeFee = useCallback((text: string) => {
    exhData.setFee(text);
  }, []);

  const onChangeIntro = useCallback((text: string) => {
    exhData.setIntro(text);
  }, []);

  const onChangeUrl = useCallback((text: string) => {
    exhData.setUrl(text);
  }, []);

  const handleCloseSelectPeriodModal = () => {
    setIsPeriodModalVisible(false);
  };

  const handleOpenSelectPeriodModal = () => {
    setIsPeriodModalVisible(true);
  };

  const handleSelectedPeriod = (startDate: string, endDate: string) => {
    exhData.setStartDate(startDate);
    exhData.setEndDate(endDate);
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

      exhData.setPosterUri(imageUri);
    }
  };

  const checkFeeNumber = (fee: string) => {
    if (checkBlankInKeyword(fee)) {
      return false;
    }
    try {
      Number(fee);
    } catch (e) {
      return false;
    }
    return true;
  };

  const checkForm = () => {
    // 전시회 이름
    if (checkBlankInKeyword(exhData.exhName)) {
      showToast('전시회 제목을 입력해주세요.');
      return;
    }
    // 전시회 장소
    if (checkBlankInKeyword(exhData.gallery)) {
      showToast('전시회 장소를 선택해주세요.');
      return;
    }
    // 전시회 일정
    if (exhData.startDate === '' || exhData.endDate === '') {
      showToast('전시회 일정을 선택해주세요.');
      return;
    }
    // 전시회 작가
    if (exhData.painter && checkBlankInKeyword(exhData.painter)) {
      showToast('전시회 작가를 입력해주세요.');
      return;
    }
    // 전시회 관람료
    if (!checkFeeNumber(exhData.fee)) {
      showToast('전시회 관람료를 입력해주세요.');
      return;
    }
    // 전시회 홈페이지 링크
    if (exhData.url && checkBlankInKeyword(exhData.url)) {
      showToast('전시회 홈페이지 링크를 확인해주세요.');
      return;
    }
    // 전시회 소개글
    if (exhData.intro && checkBlankInKeyword(exhData.intro)) {
      showToast('전시회 소개글을 확인해주세요.');
      return;
    }
    // 포스터
    if (!exhData.posterUri) {
      showToast('전시회 포스터를 첨부해주세요.');
      return;
    }
    makeFormData();
  };

  const makeFormData = async () => {
    const formData = new FormData();
    const forExhDatil = formState === 'updateExhDetailByAdmin';

    formData.append(forExhDatil ? 'exhName' : 'regExhName', exhData.exhName);
    formData.append(forExhDatil ? 'gallery' : 'regGallery', exhData.gallery);
    formData.append(
      forExhDatil ? 'exhPeriodStart' : 'regExhPeriodStart',
      changeDotToHyphen(exhData.startDate),
    );
    formData.append(
      forExhDatil ? 'exhPeriodEnd' : 'regExhPeriodEnd',
      changeDotToHyphen(exhData.endDate),
    );
    formData.append(forExhDatil ? 'painter' : 'regPainter', exhData.painter);
    formData.append(forExhDatil ? 'fee' : 'regFee', Number(exhData.fee));
    formData.append(forExhDatil ? 'art' : 'regArt', undefined); // TODO

    if (
      formState !== 'updateByAdmin' &&
      formState !== 'updateExhDetailByAdmin'
    ) {
      formData.append('regDate', changeDateTimeFormat(new Date()));
    }
    if (exhData.intro) {
      formData.append(forExhDatil ? 'intro' : 'regIntro', exhData.intro);
    }
    if (exhData.url) {
      formData.append(forExhDatil ? 'url' : 'regUrl', exhData.url);
    }
    if (exhData.posterUri && exhData.posterUri.indexOf('file:///') !== -1) {
      const resultResizedImage = await changeImageSize(exhData.posterUri);
      formData.append(forExhDatil ? 'poster' : 'regPoster', resultResizedImage);
    }
    if (formState === 'create' && requestData.createRequest) {
      requestData.createRequest.setRegExhFormdata(formData);
      requestData.createRequest.setIsPreviewModalOpen(true);
    } else if (formState === 'updateByUser') {
      // 사용자 업데이트
      requestData.updateByUserRequest?.updateByUserApi({
        regExhId: requestData.updateByUserRequest?.regExhId,
        formData,
      });
    } else if (formState === 'updateByAdmin') {
      // 관리자 업데이트
      if (exhData.regComment) {
        formData.append('regComment', exhData.regComment);
      }
      requestData.updateByAdminRequest?.updateByAdminApi({
        regExhId: requestData.updateByAdminRequest?.regExhId,
        formData,
      });
    } else if (formState === 'updateExhDetailByAdmin') {
      requestData.updateExhDetailByAdminRequest?.updateByAdminApi({
        exhId: requestData.updateExhDetailByAdminRequest?.exhId,
        formData,
      });
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
              value={exhData.exhName}
              onChangeText={onChangeExhName}
            />
          </RowSectionWrapper>
          {/* 전시회 장소 */}
          <ColSectionWrapper>
            <SectionName>전시회 장소</SectionName>
            <RowSectionWrapper sectionName={'gallery'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'장소 입력'}
                value={exhData.gallery}
                onChangeText={onChangeGallery}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 일정 */}
          <CustomTouchable onPress={handleOpenSelectPeriodModal}>
            <RowSectionWrapper>
              <SectionName>전시회 일정</SectionName>
              {exhData.startDate === '' || exhData.endDate === '' ? (
                <DateText>일정 선택</DateText>
              ) : (
                <DateText>
                  {exhData.startDate} ~ {exhData.endDate}
                </DateText>
              )}
            </RowSectionWrapper>
          </CustomTouchable>
          {isPeriodModalVisible && (
            <ExhSelectPeriod
              isVisible={isPeriodModalVisible}
              onClose={handleCloseSelectPeriodModal}
              startPeriod={exhData.startDate}
              endPeriod={exhData.endDate}
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
                value={exhData.painter}
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
                value={exhData.fee}
              />
              <SectionName color={'default'}>원</SectionName>
            </FeeWrapper>
          </RowSectionWrapper>
          {/* 전시회 홈페이지 링크 */}
          <ColSectionWrapper>
            <SectionView>
              <SectionName>전시회 홈페이지 링크</SectionName>
              <SectionName color={'grey'}>(선택)</SectionName>
            </SectionView>
            <RowSectionWrapper sectionName={'url'}>
              <WriteInfo
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={'홈페이지 링크 입력'}
                value={exhData.url}
                onChangeText={onChangeUrl}
              />
            </RowSectionWrapper>
          </ColSectionWrapper>
          {/* 전시회 소개 */}
          <ColSectionWrapper>
            <SectionView>
              <SectionName>소개</SectionName>
              <SectionName color={'grey'}>(선택)</SectionName>
            </SectionView>
            <WriteIntroWrapper>
              <SectionName>"</SectionName>
              <WriteInfo
                sectionName={'intro'}
                multiline={true}
                placeholderTextColor={LIGHT_GREY}
                placeholder={!exhData.intro ? '소개글 입력' : ''}
                value={exhData.intro}
                onChangeText={onChangeIntro}
              />
              <SectionName>"</SectionName>
            </WriteIntroWrapper>
          </ColSectionWrapper>
          {/* 전시회 포스터 */}
          <ColSectionWrapper>
            <SectionName>포스터</SectionName>
            <PutThumbnail>
              {!exhData.posterUri ? (
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
                    source={{uri: exhData.posterUri}}
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

export default ExhFormFrame;

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

const SectionView = styled.View`
  flex-direction: row;
  gap: ${hp(0.3)}px;
`;

interface SectionColorProps {
  color: string;
}

const SectionName = styled.Text<SectionColorProps>`
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: ${(props: SectionColorProps) =>
    props.color === 'grey'
      ? `${LIGHT_GREY}`
      : props.color === 'default'
      ? `${DEFAULT_TEXT}`
      : `${MIDDLE_GREY}`};
`;

const DateText = styled.Text`
  font-size: ${rf(15.5)}px;
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
  background-color: rgba(217, 217, 217, 0.3);
  align-items: center;
  justify-content: center;
  height: ${hp(35)}px;
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
    props.sectionName === 'painter' ||
    props.sectionName === 'gallery'
      ? `0px`
      : `${wp(2.9)}px`};
  padding-bottom: ${(props: SectionProps) =>
    props.sectionName === 'exhName' ||
    props.sectionName === 'url' ||
    props.sectionName === 'painter' ||
    props.sectionName === 'gallery'
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

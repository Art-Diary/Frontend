import React, {ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import CustomTouchable from '~/components/common/CustomTouchable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BACK_COLOR, MAIN_COLOR} from '~/components/common/colors';
import BackView from '~/components/common/BackView';
import {checkBlankInKeyword} from '~/utils/keyword';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
} from '~/components/common/style';
import {showToast} from '~/components/common/modal/toastConfig';
import {changeImageSize} from '~/utils/resizeImage';
import {changeDateTimeFormat, changeDotToHyphen} from '~/utils/date';
import ExhSelectPeriod from '../../exhibition/modal/ExhSelectPeriodModal';
import {UpdateExhDetailType} from '~/api/exhibition';
import {UpdateRegExhType} from '~/api/regexh';
import TextInputForm from '../TextInputForm';
import ImageInputForm from '../ImageInputForm';
import EditExhDateForm from './EditExhDateForm';
import EditExhFeeForm from './EditExhFeeForm';
import EditArtCategory from '~/components/setting/EditArtCategory';
import LoadingModal from '../modal/LoadingModal';

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
  art?: string;
  setArt?: React.Dispatch<React.SetStateAction<string>>;
  regState?: string;
  regSource?: string | undefined; // 관리자 등록 전시회 업데이트일 경우에 해당
  source?: string | undefined; // 관리자 전시회 업데이트일 경우에 해당
};

type CreateApiType = {
  setRegExhFormdata: (formData: FormData | null) => void;
  setIsPreviewModalOpen: (state: boolean) => void;
};

type UpdateRegExhApiType = {
  regExhId: number;
  updateRegExhApi: (updateData: UpdateRegExhType) => void;
};

type UpdateExhDetailByAdminApiType = {
  exhId: number;
  updateByAdminApi: (updateData: UpdateExhDetailType) => void;
};

type RequestApiType = {
  isLoading: boolean;
  // 사용자 추가 api
  createRequest?: CreateApiType;
  // 사용자/관리자 등록 전시회 업데이트 api
  updateRegExhRequest?: UpdateRegExhApiType;
  // 관리자의 전시회 상세 정보 업데이트 api
  updateExhDetailByAdminRequest?: UpdateExhDetailByAdminApiType;
  // - 추가는 여기에 추가해주세용
};

interface ExhFormFrameProps {
  children?: ReactNode;
  formState:
    | 'createByUser'
    | 'updateByUser'
    | 'updateByAdmin'
    | 'updateExhDetailByAdmin';
  exhData: ExhDataSetType;
  requestData: RequestApiType;
}

const EditExhFormFrame: React.FC<ExhFormFrameProps> = ({
  children,
  formState,
  exhData,
  requestData,
}) => {
  const feeMaxInputLength = 10;
  const [isPeriodModalVisible, setIsPeriodModalVisible] = useState(false); // 일정 선택 모달

  const handleClosePeriodModal = () => {
    setIsPeriodModalVisible(false);
  };

  const handleOpenPeriodModal = () => {
    setIsPeriodModalVisible(true);
  };

  const handleSelectedPeriod = (startDate: string, endDate: string) => {
    exhData.setStartDate(startDate);
    exhData.setEndDate(endDate);
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
    // 전시회 관람료
    if (!checkFeeNumber(exhData.fee)) {
      showToast('전시회 관람료를 입력해주세요.');
      return;
    }
    // 포스터 formState === 'updateByAdmin' ||
    if (formState === 'updateExhDetailByAdmin' && !exhData.posterUri) {
      showToast('전시회 포스터를 첨부해주세요.');
      return;
    }
    // 등록 현황
    if (
      formState === 'updateByAdmin' &&
      (!exhData.regState || checkBlankInKeyword(exhData.regState))
    ) {
      showToast('등록 현황을 선택해주세요.');
      return;
    }
    makeFormData();
  };

  const makeFormData = async () => {
    const formData = new FormData();
    const forExhDatil = formState === 'updateExhDetailByAdmin';
    const exhInfoName = {
      exhName: forExhDatil ? 'exhName' : 'regExhName',
      gallery: forExhDatil ? 'gallery' : 'regGallery',
      startDate: forExhDatil ? 'exhPeriodStart' : 'regExhPeriodStart',
      endDate: forExhDatil ? 'exhPeriodEnd' : 'regExhPeriodEnd',
      painter: forExhDatil ? 'painter' : 'regPainter',
      fee: forExhDatil ? 'fee' : 'regFee',
      art: forExhDatil ? 'art' : 'regArt',
      intro: forExhDatil ? 'intro' : 'regIntro',
      url: forExhDatil ? 'url' : 'regUrl',
      poster: forExhDatil ? 'poster' : 'regPoster',
    };

    // 필수 데이터
    formData.append(exhInfoName.exhName, exhData.exhName);
    formData.append(exhInfoName.gallery, exhData.gallery);
    formData.append(
      exhInfoName.startDate,
      changeDotToHyphen(exhData.startDate),
    ); // 필수
    formData.append(exhInfoName.endDate, changeDotToHyphen(exhData.endDate));
    formData.append(exhInfoName.fee, Number(exhData.fee));
    // 선택 데이터
    if (formState === 'updateByAdmin')
      formData.append('regState', exhData.regState);
    if (formState === 'updateExhDetailByAdmin' || formState === 'updateByAdmin')
      formData.append(exhInfoName.art, exhData.art);
    if (exhData.painter) formData.append(exhInfoName.painter, exhData.painter);
    if (formState !== 'updateByAdmin' && formState !== 'updateExhDetailByAdmin')
      formData.append('regDate', changeDateTimeFormat(new Date()));
    if (exhData.intro) formData.append(exhInfoName.intro, exhData.intro);
    if (exhData.url) formData.append(exhInfoName.url, exhData.url);
    if (exhData.posterUri) {
      if (exhData.posterUri.indexOf('file:///') !== -1) {
        const resultResizedImage = await changeImageSize(exhData.posterUri);
        formData.append(exhInfoName.poster, resultResizedImage);
      } else {
        formData.append(exhInfoName.poster, {
          name: exhData.posterUri,
          type: 'image/JPEG',
          uri: exhData.posterUri,
        });
      }
    }
    requestApi(formData);
  };

  const requestApi = (formData: FormData) => {
    if (formState === 'createByUser' && requestData.createRequest) {
      // 사용자 생성
      requestData.createRequest.setRegExhFormdata(formData);
      requestData.createRequest.setIsPreviewModalOpen(true);
    } else if (formState === 'updateByUser') {
      // 사용자 업데이트
      requestData.updateRegExhRequest?.updateRegExhApi({
        regExhId: requestData.updateRegExhRequest?.regExhId,
        formData,
      });
    } else if (formState === 'updateByAdmin') {
      // 관리자 업데이트
      if (exhData.regComment) {
        formData.append('regComment', exhData.regComment);
      }
      if (exhData.regSource) {
        formData.append('regSource', exhData.regSource);
      }
      requestData.updateRegExhRequest?.updateRegExhApi({
        regExhId: requestData.updateRegExhRequest?.regExhId,
        formData,
      });
    } else if (formState === 'updateExhDetailByAdmin') {
      // 관리자 업데이트
      if (exhData.source) {
        formData.append('source', exhData.source);
      }
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
        <LoadingModal isLoading={requestData.isLoading} />
        <BackView title="전시회 등록" line={true} children={null} />
        <ContentsContainer>
          {/* 전시회 제목 */}
          <TextInputForm
            title={'전시회 제목'}
            isEssential
            multiLine
            keyword={exhData.exhName}
            handleKeyword={exhData.setExhName}
          />
          {/* 전시회 장소 */}
          <TextInputForm
            title={'전시회 장소'}
            isEssential
            multiLine
            keyword={exhData.gallery}
            handleKeyword={exhData.setGallery}
          />
          {/* 전시회 일정 */}
          <EditExhDateForm
            startDate={exhData.startDate}
            endDate={exhData.endDate}
            handleOpenModal={handleOpenPeriodModal}
          />
          {isPeriodModalVisible && (
            <ExhSelectPeriod
              onClose={handleClosePeriodModal}
              startPeriod={exhData.startDate}
              endPeriod={exhData.endDate}
              handleSelectedPeriod={handleSelectedPeriod}
            />
          )}
          {/* 전시회 작가 */}
          {(formState === 'updateByAdmin' ||
            formState === 'updateExhDetailByAdmin') && (
            <TextInputForm
              title={'전시회 작가'}
              multiLine
              keyword={exhData.painter ?? ''}
              handleKeyword={exhData.setPainter}
            />
          )}
          {/* 전시회 관람료 */}
          <EditExhFeeForm
            maxLen={feeMaxInputLength}
            keyword={exhData.fee}
            handleKeyword={exhData.setFee}
          />
          {/* 전시회 분야 */}
          {(formState === 'updateByAdmin' ||
            formState === 'updateExhDetailByAdmin') &&
            exhData.setArt && (
              <EditArtCategory
                title={'전시 분야'}
                getValue={exhData.art ?? undefined}
                setValue={exhData.setArt}
              />
            )}
          {/* 전시회 홈페이지 링크 */}
          <TextInputForm
            title={'홈페이지 링크'}
            multiLine
            keyword={exhData.url ?? ''}
            handleKeyword={exhData.setUrl}
          />
          {/* 전시회 소개 */}
          {(formState === 'updateByAdmin' ||
            formState === 'updateExhDetailByAdmin') && (
            <TextInputForm
              title={'전시회 소개'}
              multiLine
              keyword={exhData.intro ?? ''}
              handleKeyword={exhData.setIntro}
            />
          )}
          {/* 전시회 포스터 formState === 'updateByAdmin' ||*/}
          <ImageInputForm
            title={
              '포스터 ' +
              (formState === 'updateByAdmin' ? '(등록 완료일 경우 필수)' : '')
            }
            isEssential={formState === 'updateExhDetailByAdmin'}
            image={exhData.posterUri}
            handleImage={exhData.setPosterUri}
          />
          {children}
          {/* 확인 버튼 */}
          <CustomTouchable onPress={checkForm}>
            <ConfirmButton>확인</ConfirmButton>
          </CustomTouchable>
        </ContentsContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default EditExhFormFrame;

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

const ConfirmButton = styled.Text`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${MAIN_COLOR};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

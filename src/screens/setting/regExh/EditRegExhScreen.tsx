import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  useUpdateRegExhByAdmin,
  useUpdateRegExhByUser,
} from '~/api/queries/regexh';
import ExhFormFrame from '~/components/exhibition/ExhFormFrame';
import {
  AREA_FONT_SIZE,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {RegExhDetailInfo} from '~/types';

type RootStackParamList = {
  EditRegExh: {
    regExhInfo: RegExhDetailInfo;
    role: 'ADMIN' | 'USER_WAIT';
  };
};

type EditRegExhRouteProp = RouteProp<RootStackParamList, 'EditRegExh'>;

interface Props {
  route: EditRegExhRouteProp;
}

const EditRegExhScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {regExhInfo, role} = route.params;

  const [regExhName, setRegExhName] = useState<string>('');
  const [regGallery, setRegGallery] = useState<string>('');
  const [regStartDate, setRegStartDate] = useState<string>('');
  const [regEndDate, setRegEndDate] = useState<string>('');
  const [regPainter, setRegPainter] = useState<string>('');
  const [regFee, setRegFee] = useState<string>('');
  const [regUrl, setRegUrl] = useState<string | undefined>(undefined);
  const [regIntro, setRegIntro] = useState<string | undefined>(undefined);
  const [regPosterUri, setRegPosterUri] = useState<string | undefined>(
    undefined,
  );
  const [regComment, setRegComment] = useState<string | undefined>(undefined);

  // update by admin api
  const {
    mutate: updateRegExhByAdmin,
    isLoading: isLoadingByAdmin,
    isError: isErrorByAdmin,
    isSuccess: isSuccessByAdmin,
  } = useUpdateRegExhByAdmin();
  // update by user api
  const {
    mutate: updateRegExhByUser,
    isLoading: isLoadingByUser,
    isError: isErrorByUser,
    isSuccess: isSuccessByUser,
  } = useUpdateRegExhByUser();

  useEffect(() => {
    if (regExhInfo) {
      setRegExhName(regExhInfo.regExhName);
      setRegGallery(regExhInfo.regGallery);
      setRegStartDate(regExhInfo.regExhPeriodStart);
      setRegEndDate(regExhInfo.regExhPeriodEnd);
      setRegPainter(regExhInfo.regPainter);
      setRegFee(regExhInfo.regFee.toString());
      setRegUrl(regExhInfo.regUrl);
      setRegIntro(regExhInfo.regIntro);
      setRegPosterUri(regExhInfo.regPoster);
      setRegComment(regExhInfo.regComment);
    }
  }, [regExhInfo]);

  useEffect(() => {
    if (isErrorByAdmin) {
      showToast('전시회 등록을 실패했습니다.');
    }
    if (isSuccessByAdmin) {
      // 이전 페이지로 이동
      navigation.goBack();
    }
  }, [isErrorByAdmin, isSuccessByAdmin]);

  useEffect(() => {
    if (isErrorByUser) {
      showToast('전시회 등록을 실패했습니다.');
    }
    if (isSuccessByUser) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
      showToast('성공적으로 수정됐습니다.');
      navigation.goBack();
    }
  }, [isErrorByUser, isSuccessByUser]);

  const onChangeComment = useCallback((text: string) => {
    setRegComment(text);
  }, []);

  return (
    <ExhFormFrame
      formState={role === 'ADMIN' ? 'updateByAdmin' : 'updateByUser'}
      exhData={{
        exhName: regExhName,
        setExhName: setRegExhName,
        gallery: regGallery,
        setGallery: setRegGallery,
        startDate: regStartDate,
        setStartDate: setRegStartDate,
        endDate: regEndDate,
        setEndDate: setRegEndDate,
        painter: regPainter,
        setPainter: setRegPainter,
        fee: regFee,
        setFee: setRegFee,
        url: regUrl,
        setUrl: setRegUrl,
        intro: regIntro,
        setIntro: setRegIntro,
        posterUri: regPosterUri,
        setPosterUri: setRegPosterUri,
        regComment,
      }}
      requestData={{
        isLoading: role === 'ADMIN' ? isLoadingByAdmin : isLoadingByUser,
        updateRegExhRequest: {
          regExhId: regExhInfo.regExhId,
          updateRegExhApi:
            role === 'ADMIN' ? updateRegExhByAdmin : updateRegExhByUser,
        },
      }}>
      {role === 'ADMIN' && (
        <ColSectionWrapper>
          <SectionView>
            <SectionName>코멘트</SectionName>
            <SectionName color={'grey'}>(선택)</SectionName>
          </SectionView>
          <RowSectionWrapper>
            <WriteInfo
              textAlignVertical={'top'}
              multiline={true}
              placeholderTextColor={LIGHT_GREY}
              placeholder={'코멘트 작성'}
              value={regComment}
              onChangeText={onChangeComment}
            />
          </RowSectionWrapper>
        </ColSectionWrapper>
      )}
    </ExhFormFrame>
  );
};

export default EditRegExhScreen;

/** style */
const RowSectionWrapper = styled.View`
  flex-direction: row;
  border-width: ${ITEM_BORDER_WIDTH}px;
  border-color: ${LIGHT_GREY};
  border-radius: ${BUTTON_RADIUS}px;
  align-items: center;
  justify-content: space-between;
  padding-left: ${wp(2.8)}px;
  padding-right: ${wp(2.8)}px;
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

const SectionView = styled.View`
  flex-direction: row;
  gap: ${hp(0.3)}px;
`;

interface SectionProps {
  color: string;
}

const SectionName = styled.Text<SectionProps>`
  font-size: ${AREA_FONT_SIZE}px;
  font-family: ${FONT_NAME};
  color: ${(props: SectionProps) =>
    props.color === 'grey' ? `${LIGHT_GREY}` : `${MIDDLE_GREY}`};
`;

const WriteInfo = styled.TextInput`
  font-size: ${rf(16)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
  padding-right: 0%;
  min-height: ${hp(25)}px;
`;

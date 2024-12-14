import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {
  useUpdateRegExhByAdmin,
  useUpdateRegExhByUser,
} from '~/api/queries/regexh';
import EditExhFormFrame from '~/components/common/exhibition/EditExhFormFrame';
import {RegExhDetailInfo} from '~/types';
import TextInputForm from '~/components/common/TextInputForm';
import styled from 'styled-components/native';
import {BUTTON_PADDING, FONT_NAME} from '~/components/common/style';
import {
  DEFAULT_TEXT,
  LIGHT_GREY,
  TEXTINPUTFORM_COLOR,
} from '~/components/common/colors';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';

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
  const [regArt, setRegArt] = useState<string>('');
  const [regState, setRegState] = useState<string>('');

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
      setRegArt(regExhInfo.regArt);
      setRegState(regExhInfo.regState);
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

  const handleComplete = () => {
    const state: string = '완료';
    if (regState === state) {
      setRegState('');
    } else {
      setRegState(state);
    }
  };

  const handleFail = () => {
    const state: string = '실패';
    if (regState === state) {
      setRegState('');
    } else {
      setRegState(state);
    }
  };

  return (
    <EditExhFormFrame
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
        art: regArt,
        setArt: setRegArt,
        regState,
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
        <>
          <TextInputForm
            title={'코멘트'}
            multiLine
            keyword={regComment ?? ''}
            handleKeyword={setRegComment}
          />
          <ButtonWrapper>
            <ButtonView activeOpacity={0.6} onPress={handleComplete}>
              <ButtonText state={regState === '완료'}>완료</ButtonText>
            </ButtonView>
            <ButtonView activeOpacity={0.6} onPress={handleFail}>
              <ButtonText state={regState === '실패'}>실패</ButtonText>
            </ButtonView>
          </ButtonWrapper>
        </>
      )}
    </EditExhFormFrame>
  );
};

export default EditRegExhScreen;

/** style */
const ButtonWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  gap: ${hp(1.6)}px;
  justify-content: space-between;
`;

const ButtonView = styled.TouchableOpacity`
  width: 48.3%;
`;

interface ButtonTextProps {
  state: boolean;
}

const ButtonText = styled.Text<ButtonTextProps>`
  background-color: ${(props: ButtonTextProps) =>
    props.state ? `${TEXTINPUTFORM_COLOR}` : `${LIGHT_GREY}`};
  padding: ${BUTTON_PADDING}px;
  border-radius: ${wp(5)}px;
  text-align: center;
  color: ${DEFAULT_TEXT};
  font-size: ${rf(15)}px;
  font-family: ${FONT_NAME};
`;

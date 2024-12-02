import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {useUpdateRegExhByUser} from '~/api/queries/regexh';
import ExhFormFrame from '~/components/exhibition/ExhFormFrame';

type RootStackParamList = {
  EditRegExhByUser: {regExhInfo: any};
};

type EditRegExhRouteProp = RouteProp<RootStackParamList, 'EditRegExhByUser'>;

interface Props {
  route: EditRegExhRouteProp;
}

const EditRegExhByUser: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {regExhInfo} = route.params;

  const [regExhId, setRegExhId] = useState<number>(0);
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

  // update by user api
  const {
    mutate: updateRegExh,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateRegExhByUser();

  useEffect(() => {
    if (regExhInfo) {
      setRegExhId(regExhInfo.regExhId);
      setRegExhName(regExhInfo.regExhName);
      setRegGallery(regExhInfo.regGallery);
      setRegStartDate(regExhInfo.regExhPeriodStart);
      setRegEndDate(regExhInfo.regExhPeriodEnd);
      setRegPainter(regExhInfo.regPainter);
      setRegFee(regExhInfo.regFee.toString());
      setRegUrl(regExhInfo.regUrl);
      setRegIntro(regExhInfo.regIntro);
      setRegPosterUri(regExhInfo.regPoster);
    }
  }, [regExhInfo]);

  useEffect(() => {
    if (isError) {
      showToast('전시회 등록을 실패했습니다.');
    }
    if (isSuccess) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
      navigation.goBack();
      showToast('성공적으로 수정됐습니다.');
    }
  }, [isError, isSuccess]);

  return (
    <Container>
      <ExhFormFrame
        formState={'updateByUser'}
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
        }}
        requestData={{
          isLoading: isLoading,
          updateByUserRequest: {regExhId, updateByUserApi: updateRegExh},
        }}
      />
    </Container>
  );
};

export default EditRegExhByUser;

/** style */
const Container = styled.View`
  flex: 1;
`;

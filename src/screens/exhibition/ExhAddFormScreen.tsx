import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateRegExh} from '~/api/queries/regexh';
import RegExhFormFrame from '~/components/regexh/RegExhFormFrame';

const ExhAddFormScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
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
  // create api
  const {
    mutate: createRegExh,
    isLoading: isLoading,
    isError: isError,
    isSuccess: isSuccess,
  } = useCreateRegExh();

  useEffect(() => {
    if (isError) {
      showToast('전시회 등록 작성을 실패했습니다.');
    }
    if (isSuccess) {
      // navigation.navigate(); // 설정 페이지의 등록한 전시회 페이지로 이동
    }
  }, [isError, isSuccess]);

  return (
    <RegExhFormFrame
      formState={'create'}
      regExhData={{
        regExhName,
        setRegExhName,
        regGallery,
        setRegGallery,
        regStartDate,
        setRegStartDate,
        regEndDate,
        setRegEndDate,
        regPainter,
        setRegPainter,
        regFee,
        setRegFee,
        regUrl,
        setRegUrl,
        regIntro,
        setRegIntro,
        regPosterUri,
        setRegPosterUri,
      }}
      requestData={{isLoading: isLoading, createApi: createRegExh}}
    />
  );
};

export default ExhAddFormScreen;

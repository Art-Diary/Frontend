import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateRegExh} from '~/api/queries/regexh';
import EditExhFormFrame from '~/components/common/exhibition/EditExhFormFrame';
import RegExhPreviewModal from '../../components/exhibition/modal/RegExhPreviewModal';

const RegisterNewExhScreen = () => {
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

  const [regExhFormdata, setRegExhFormdata] = useState<FormData | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  // create api
  const {
    mutate: createRegExh,
    isLoading,
    isError,
    isSuccess,
  } = useCreateRegExh();

  useEffect(() => {
    if (isError) {
      showToast('다시 시도해주세요.');
    }
    if (isSuccess) {
      // 설정 페이지의 등록한 전시회 페이지로 이동
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {
                  name: 'Setting',
                  params: undefined,
                },
              ],
            },
          },
          {
            name: 'RegExhList',
            params: {isAdmin: false},
          },
        ],
      });
    }
  }, [isError, isSuccess]);

  return (
    <>
      <EditExhFormFrame
        formState={'createByUser'}
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
          createRequest: {
            setRegExhFormdata: setRegExhFormdata,
            setIsPreviewModalOpen: setIsPreviewModalOpen,
          },
        }}
      />
      {isPreviewModalOpen && (
        <RegExhPreviewModal
          onClose={() => setIsPreviewModalOpen(false)}
          regExhData={{
            regExhName,
            regGallery,
            regStartDate,
            regEndDate,
            regPainter,
            regFee,
            regUrl,
            regIntro,
            regPosterUri,
          }}
          createApi={() => createRegExh(regExhFormdata)}
        />
      )}
    </>
  );
};

export default RegisterNewExhScreen;

import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import {useCreateRegExh} from '~/api/queries/regexh';
import RegExhFormFrame from '~/components/regexh/RegExhFormFrame';
import RegExhPreviewModal from './RegExhPreviewModal';

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

  const [regExhFormdata, setRegExhFormdata] = useState<FormData | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

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
            name: 'RegisterNewExhScreen',
          },
        ],
      });
    }
  }, [isError, isSuccess]);

  return (
    <>
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
          isVisible={isPreviewModalOpen}
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

export default ExhAddFormScreen;

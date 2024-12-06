import React, {useEffect, useState} from 'react';
import {showToast} from '~/components/common/modal/toastConfig';
import ExhFormFrame from '~/components/exhibition/ExhFormFrame';
import {useUpdateExhDetailInfo} from '~/api/queries/exhibition';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {ExhDetailInfo} from '~/types';
import {RootStackNavigationProp} from '~/App';
type RootStackParamList = {
  ExhDetailEdit: {exhDetailInfo: ExhDetailInfo};
};
type ExhDetailEditScreenProp = RouteProp<RootStackParamList, 'ExhDetailEdit'>;
interface Props {
  route: ExhDetailEditScreenProp;
}
const ExhDetailEditScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const {exhDetailInfo} = route.params;
  const [exhName, setExhName] = useState<string>('');
  const [gallery, setGallery] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [painter, setPainter] = useState<string | undefined>(undefined);
  const [fee, setFee] = useState<string>('');
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [intro, setIntro] = useState<string | undefined>(undefined);
  const [posterUri, setPosterUri] = useState<string | undefined>(undefined);
  // update exh detail by admin api
  const {
    mutate: updateExhDetailInfo,
    isLoading,
    isError,
    isSuccess,
  } = useUpdateExhDetailInfo();
  useEffect(() => {
    if (exhDetailInfo) {
      setExhName(exhDetailInfo.exhName);
      setGallery(exhDetailInfo.gallery);
      setStartDate(exhDetailInfo.exhPeriodStart);
      setEndDate(exhDetailInfo.exhPeriodEnd);
      setPainter(exhDetailInfo.painter);
      setFee(exhDetailInfo.fee.toString());
      setUrl(exhDetailInfo.url);
      setIntro(exhDetailInfo.intro);
      setPosterUri(exhDetailInfo.poster);
    }
  }, [exhDetailInfo]);
  useEffect(() => {
    if (isError) {
      showToast('전시회 수정을 실패했습니다.');
    }
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isError, isSuccess]);
  return (
    <ExhFormFrame
      formState={'updateExhDetailByAdmin'}
      exhData={{
        exhName,
        setExhName,
        gallery,
        setGallery,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        painter,
        setPainter,
        fee,
        setFee,
        url,
        setUrl,
        intro,
        setIntro,
        posterUri,
        setPosterUri,
      }}
      requestData={{
        isLoading: isLoading,
        updateExhDetailByAdminRequest: {
          exhId: exhDetailInfo.exhId,
          updateByAdminApi: updateExhDetailInfo,
        },
      }}
    />
  );
};
export default ExhDetailEditScreen;

import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ConfirmRegExh from './ConfirmRegExh';
import ShowConfirmedRegExh from './ShowConfirmedRegExh';

type RootStackParamList = {
  ConfirmRegExhScreen: {regExhId: number};
};

type ConfirmRegExhScreenProp = RouteProp<
  RootStackParamList,
  'ConfirmRegExhScreen'
>;

interface Props {
  route: ConfirmRegExhScreenProp;
}

const ConfirmRegExhScreen: React.FC<Props> = ({route}) => {
  const {regExhId} = route.params;
  // fetch api
  const {data, isLoading, isError, isSuccess, refetch} = usefetchRegExhDetail(
    regExhId,
    true,
  );
  const [regExhInfo, setRegExhInfo] = useState<any | null>(null);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setRegExhInfo(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast('전시회 등록 정보 조회를 실패했습니다.');
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    } else {
      setIsLoadingOpen(false);
    }
  }, [isError, isLoading]);

  return (
    <>
      {regExhInfo &&
        (!regExhInfo.regState ? (
          // regState == false면 등록 화면 보여주기
          <ConfirmRegExh regExhId={regExhId} regExhInfo={regExhInfo} />
        ) : (
          // regState == true면 미리보기 화면 보여주기
          <ShowConfirmedRegExh
            regExhId={regExhId}
            regExhInfo={regExhInfo}
            refetch={refetch}
          />
        ))}

      {isLoadingOpen && <LoadingModal message={'정보 불러오는 중 :)'} />}
    </>
  );
};

export default ConfirmRegExhScreen;

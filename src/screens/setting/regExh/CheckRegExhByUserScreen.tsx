import React, {useEffect, useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import RegExhDetailFormat from '~/components/regExh/RegExhDetailFormat';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

type RootStackParamList = {
  CheckRegExhByUser: {regExhId: number};
};

type CheckRegExhRouteProp = RouteProp<RootStackParamList, 'CheckRegExhByUser'>;

interface Props {
  route: CheckRegExhRouteProp;
}

const CheckRegExhByUserScreen: React.FC<Props> = ({route}) => {
  const isFocused = useIsFocused();
  const {regExhId} = route.params;
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  const {
    data: regExhInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = usefetchRegExhDetail(regExhId, false);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {regExhInfo && (
        // 사용자 확인용 - 등록된 전시회 확인 페이지
        <RegExhDetailFormat
          role={regExhInfo.regState === '대기' ? 'USER_WAIT' : 'USER_COMPLETE'}
          regExhInfo={regExhInfo}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CheckRegExhByUserScreen;

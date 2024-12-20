import React, {useEffect, useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import RegExhDetailFormat from '~/components/regExh/RegExhDetailFormat';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

type RootStackParamList = {
  ConfirmRegExhByAdmin: {regExhId: number};
};

type ConfirmRegExhScreenProp = RouteProp<
  RootStackParamList,
  'ConfirmRegExhByAdmin'
>;

interface Props {
  route: ConfirmRegExhScreenProp;
}

const ConfirmRegExhByAdminScreen: React.FC<Props> = ({route}) => {
  const isFocused = useIsFocused();
  const {regExhId} = route.params;
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

  // fetch api
  const {
    data: regExhInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = usefetchRegExhDetail(regExhId, true);

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
        // 관리자 확인용 - 등록된 전시회 확인 페이지
        <RegExhDetailFormat
          role={'ADMIN'}
          regExhInfo={regExhInfo}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ConfirmRegExhByAdminScreen;

import React, {useEffect, useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import RegExhDetailFormat from '~/components/regExh/RegExhDetailFormat';
import {showToast} from '~/components/common/modal/toastConfig';

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
  const {
    data: regExhInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = usefetchRegExhDetail(regExhId, false);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      handleRefetch();
    }
  }, [isFocused]);

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

  const handleRefetch = async () => {
    await refetch().then(() => {
      setIsLoadingOpen(false);
    });
  };

  return (
    <>
      {regExhInfo && (
        // 사용자 확인용 - 등록된 전시회 확인 페이지
        <RegExhDetailFormat
          role={regExhInfo.regState ? 'USER_COMPLETE' : 'USER_WAIT'}
          regExhInfo={regExhInfo}
          refetch={refetch}
        />
      )}
      {isLoadingOpen && <LoadingModal message={'정보 불러오는 중 :)'} />}
    </>
  );
};

export default CheckRegExhByUserScreen;

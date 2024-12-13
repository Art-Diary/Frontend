import React, {useEffect, useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import LoadingModal from '~/components/common/modal/LoadingModal';
import RegExhDetailFormat from '~/components/regExh/RegExhDetailFormat';

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
  // fetch api
  const {
    data: regExhInfo,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = usefetchRegExhDetail(regExhId, true);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      handleRefetch();
    }
  }, [isFocused]);

  const handleRefetch = async () => {
    await refetch().then(() => {
      setIsLoadingOpen(false);
    });
  };

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
      {regExhInfo && (
        // 관리자 확인용 - 등록된 전시회 확인 페이지
        <RegExhDetailFormat
          role={'ADMIN'}
          regExhInfo={regExhInfo}
          refetch={refetch}
        />
      )}
      {isLoadingOpen && <LoadingModal message={'정보 불러오는 중 :)'} />}
    </>
  );
};

export default ConfirmRegExhByAdminScreen;

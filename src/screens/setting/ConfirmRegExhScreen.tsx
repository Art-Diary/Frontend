import React, {useEffect, useState} from 'react';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {usefetchRegExhDetail} from '~/api/queries/regexh';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ConfirmRegExh from './ConfirmRegExh';
import ShowConfirmedRegExh from './ShowConfirmedRegExh';

type RootStackParamList = {
  ConfirmRegExhScreen: {regExhId: number; forUpdate: boolean};
};

type ConfirmRegExhScreenProp = RouteProp<
  RootStackParamList,
  'ConfirmRegExhScreen'
>;

interface Props {
  route: ConfirmRegExhScreenProp;
}

const ConfirmRegExhScreen: React.FC<Props> = ({route}) => {
  const isFocused = useIsFocused();
  const {regExhId, forUpdate} = route.params;
  // fetch api
  const {data, isLoading, isError, isSuccess, refetch} = usefetchRegExhDetail(
    regExhId,
    true,
  );
  const [regExhInfo, setRegExhInfo] = useState<any | null>(null);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const handleRefetch = async () => {
    await refetch().then(res => {
      setRegExhInfo(res.data);
      setIsLoadingOpen(false);
    });
  };

  useEffect(() => {
    if (forUpdate) {
      setIsUpdate(true);
    }
  }, [forUpdate]);

  useEffect(() => {
    if (isFocused) {
      handleRefetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      setRegExhInfo(data);
      setIsUpdate(!data.regState);
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

  const handleCompleteUpdate = async () => {
    setIsLoadingOpen(true);
    setIsUpdate(false);
    setRegExhInfo(null);
    await handleRefetch();
  };

  return (
    <>
      {regExhInfo &&
        (isUpdate ? (
          // regState == false 또는 forUpdate == true면 등록 화면 보여주기
          <ConfirmRegExh
            regExhId={regExhId}
            regExhInfo={regExhInfo}
            handleIsUpdate={handleCompleteUpdate}
          />
        ) : (
          // regState == true면 미리보기 화면 보여주기
          <ShowConfirmedRegExh
            regExhId={regExhId}
            regExhInfo={regExhInfo}
            refetch={refetch}
            handleMoveToUpdatePage={() => setIsUpdate(true)}
          />
        ))}

      {isLoadingOpen && <LoadingModal message={'정보 불러오는 중 :)'} />}
    </>
  );
};

export default ConfirmRegExhScreen;

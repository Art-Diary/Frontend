import React, {useEffect} from 'react';
import {useFetchMyStoredDateListOfExh} from '~/api/queries/mydiary';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useIsFocused} from '@react-navigation/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {StoredDateListOfExh} from './ChooseVisitDateScreen';

interface StoredDateListProps {
  handleStoredDateList: (list: StoredDateListOfExh[]) => void;
}

const FetchMyStoredDateListOfExh: React.FC<StoredDateListProps> = ({
  handleStoredDateList,
}) => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;

  // 모임과 개인 전시회 날짜
  const {
    data: storedDateListOfExh,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchMyStoredDateListOfExh(visitedExhId); // 한 전시회에 대하여 캘린더에 저장된 날짜 조회

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      handleStoredDateList(storedDateListOfExh);
    }
  }, [isSuccess, storedDateListOfExh]);

  if (isError) {
    showToast('방문 날짜 조회 실패 ;(');
  }

  if (isLoading) {
    return <LoadingModal message={'방문 날짜 조회 중 :)'} />;
  }

  return <></>;
};

export default FetchMyStoredDateListOfExh;

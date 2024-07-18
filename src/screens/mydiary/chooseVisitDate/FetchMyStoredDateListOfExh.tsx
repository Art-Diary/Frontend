import React, {useEffect, useState} from 'react';
import {useFetchMyStoredDateListOfExh} from '~/api/queries/mydiary';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useIsFocused} from '@react-navigation/native';
import {showToast} from '~/components/common/modal/toastConfig';
import {MyVisitedDateType} from '~/utils/dataTypes';

interface StoredDateListProps {
  handleStoredDateList: (list: MyVisitedDateType[]) => void;
}

const FetchMyStoredDateListOfExh: React.FC<StoredDateListProps> = ({
  handleStoredDateList,
}) => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const [isOpenLoading, setIsOpenLoading] = useState(false);

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

  useEffect(() => {
    if (isError) {
      showToast('방문 날짜 조회 실패 ;(');
    }
    if (isLoading) {
      setIsOpenLoading(true);
    } else {
      setIsOpenLoading(false);
    }
  }, [isError, isLoading]);

  return (
    <>{isOpenLoading && <LoadingModal message={'방문 날짜 조회 중 :)'} />}</>
  );
};

export default FetchMyStoredDateListOfExh;

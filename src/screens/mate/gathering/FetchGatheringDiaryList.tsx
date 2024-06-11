import {useIsFocused} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useFetchGatheringDiaryList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';

type FetchInfo = {
  gatherId: number;
  exhId: number;
};

interface FetchGatheringDiaryListProps {
  fetchInfo: FetchInfo;
}

const FetchGatheringDiaryList: React.FC<FetchGatheringDiaryListProps> = ({
  fetchInfo,
}) => {
  const isFocused = useIsFocused();
  const {
    data: gatheringDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchGatheringDiaryList(fetchInfo.gatherId, fetchInfo.exhId);

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return <ErrorMessageView message="전시 메이트 다이어리 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="전시 메이트 다이어리 조회 중:)" />;
  }

  if (gatheringDiaryList.length === 0) {
    return <ErrorMessageView message="아직 전시회에 대힌 기록이 없습니다." />;
  }

  return (
    <>
      {/* body */}

      {gatheringDiaryList.length === 0 ? (
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList diaryList={gatheringDiaryList} />
      )}
    </>
  );
};

export default FetchGatheringDiaryList;

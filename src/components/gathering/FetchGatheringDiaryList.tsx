import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useFetchGatheringDiaryList} from '~/api/queries/gathering';
import InfoMessageView from '~/components/common/InfoMessageView';
import DiaryList from '~/components/common/diary/DiaryList';
import LoadingModal from '../common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

type FetchInfo = {
  gatherId: number;
  exhId: number;
};

type DeleteActions = {
  handleShowOptionBar: (show: boolean) => void; // 내가 작성한 기록만 옵션바가 보이도록
  isDeleteModalOpen: boolean; // 옵션 모달에서 삭제 눌렀는지
  handleCloseDeleteModal: () => void; // 삭제 모달 닫기
  handleCloseOptionModal: () => void; // 옵션 모달 닫기
};

type UpdateActions = {
  isUpdateClicked: boolean;
  handleUpdateClicked: () => void;
  handleCloseOptionModal: () => void; // 옵션 모달 닫기
};

interface FetchGatheringDiaryListProps {
  fetchInfo: FetchInfo;
  deleteActions: DeleteActions;
  updateActions: UpdateActions;
  pageNum: number;
}

const FetchGatheringDiaryList: React.FC<FetchGatheringDiaryListProps> = ({
  fetchInfo,
  deleteActions,
  updateActions,
  pageNum,
}) => {
  const isFocused = useIsFocused();
  const [first, setFirst] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  const {
    data: gatheringDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchGatheringDiaryList(fetchInfo.gatherId, fetchInfo.exhId);

  // Effects
  useEffect(() => {
    if (isFocused) {
      refetch();
      setFirst(false);
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
      {/* body */}
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {gatheringDiaryList &&
        (gatheringDiaryList.length === 0 ? (
          <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
        ) : (
          <DiaryList
            pageNum={pageNum}
            first={first}
            handleFirst={() => setFirst(true)}
            diaryList={gatheringDiaryList}
            deleteActions={deleteActions}
            updateActions={updateActions}
          />
        ))}
    </>
  );
};

export default FetchGatheringDiaryList;

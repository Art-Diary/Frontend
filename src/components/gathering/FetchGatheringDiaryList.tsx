import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useFetchGatheringDiaryList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/common/diary/DiaryList';

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
  const {
    data: gatheringDiaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchGatheringDiaryList(fetchInfo.gatherId, fetchInfo.exhId);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (isFocused) {
      refetch();
      setFirst(false);
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
        <DiaryList
          pageNum={pageNum}
          first={first}
          handleFirst={() => setFirst(true)}
          diaryList={gatheringDiaryList}
          deleteActions={deleteActions}
          updateActions={updateActions}
        />
      )}
    </>
  );
};

export default FetchGatheringDiaryList;

import React, {useEffect, useState} from 'react';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryListInCalendar} from '~/api/queries/mydiary';
import InfoMessageView from '~/components/common/InfoMessageView';
import DiaryList from '~/components/common/diary/DiaryList';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import {useIsFocused} from '@react-navigation/native';
import LoadingModal from '~/components/common/modal/LoadingModal';
import ErrorModal from '~/components/common/modal/ErrorModal';

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

interface CalendarDiaryListProps {
  deleteActions: DeleteActions;
  updateActions: UpdateActions;
  pageNum: number;
}

const CalendarDiaryList: React.FC<CalendarDiaryListProps> = ({
  deleteActions,
  updateActions,
  pageNum,
}) => {
  const isFocused = useIsFocused();
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const exhFromCalendarInfo = useExhFromCalendarInfo();
  const {
    data: diaryList,
    isLoading,
    isError,
    refetch,
  } = useFetchMyDiaryListInCalendar(
    visitedExhId,
    exhFromCalendarInfo.forget,
    exhFromCalendarInfo.visitDate,
    exhFromCalendarInfo.gatherId,
  );
  const [first, setFirst] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);

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
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      {diaryList &&
        (diaryList.length === 0 ? (
          <InfoMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
        ) : (
          <DiaryList
            pageNum={pageNum}
            first={first}
            handleFirst={() => setFirst(true)}
            diaryList={diaryList}
            deleteActions={deleteActions}
            updateActions={updateActions}
          />
        ))}
    </>
  );
};

export default CalendarDiaryList;

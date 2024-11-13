import React, {useEffect, useState} from 'react';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryListInCalendar} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import {useIsFocused} from '@react-navigation/native';

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
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (isFocused) {
      refetch();
      setFirst(false);
    }
  }, [isFocused]);

  useEffect(() => {
    if (isError) {
      setHaveError(true);
    }
    if (isLoading) {
      setIsLoadingOpen(true);
    } else {
      setIsLoadingOpen(false);
    }
  }, [isError, isLoading]);

  return (
    <>
      {haveError ? (
        <ErrorMessageView
          message={'특정 날짜의 내 다이어리 목록 조회 실패 ;('}
        />
      ) : !diaryList ? (
        <></>
      ) : diaryList.length === 0 ? (
        <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />
      ) : (
        <DiaryList
          pageNum={pageNum}
          first={first}
          handleFirst={() => setFirst(true)}
          diaryList={diaryList}
          deleteActions={deleteActions}
          updateActions={updateActions}
        />
      )}
      {isLoadingOpen && (
        <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />
      )}
    </>
  );
};

export default CalendarDiaryList;

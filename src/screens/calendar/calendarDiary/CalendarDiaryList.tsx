import React, {useEffect} from 'react';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useFetchMyDiaryListInCalendar} from '~/api/queries/mydiary';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import DiaryList from '~/components/diary/DiaryList';
import {useExhFromCalendarInfo} from '~/zustand/calendar/exhFromCalendar';
import {useIsFocused} from '@react-navigation/native';

const CalendarDiaryList = () => {
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

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  if (isError) {
    return (
      <ErrorMessageView message={'특정 날짜의 내 다이어리 목록 조회 실패 ;('} />
    );
  }

  if (isLoading) {
    return <LoadingModal message={'내 다이어리 목록 조회 중 :)'} />;
  }

  if (diaryList.length === 0) {
    return <ErrorMessageView message={'아직 전시회에 대한 기록이 없습니다.'} />;
  }

  return <DiaryList diaryList={diaryList} />;
};

export default CalendarDiaryList;

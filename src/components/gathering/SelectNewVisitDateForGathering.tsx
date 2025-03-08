import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {DARK_GREY, MIDDLE_GREY} from '../common/colors';
import {FONT_NAME} from '../common/style';
import {calendarColor} from '~/components/calendar/calendarColor';
import {MarkedType} from '~/types';
import {useFetchStoredDateOfExhInGroup} from '~/api/queries/exhibition';
import CalendarSelectDateFrame from '../common/CalendarSelectDateFrame';
import LoadingModal from '../common/modal/LoadingModal';
import ErrorModal from '../common/modal/ErrorModal';

interface SelectNewVIsitDateProps {
  exhId: number;
  gatherId: number;
  handleSelectDate: (date: string) => void;
  selectedDate: string;
  initDate: string;
  handleAlreadyVisit: (visit: boolean) => void;
}

const SelectNewVisitDateForGathering: React.FC<SelectNewVIsitDateProps> = ({
  exhId,
  gatherId,
  handleSelectDate,
  selectedDate,
  initDate,
  handleAlreadyVisit,
}) => {
  const [isErrorOpen, setIsErrorOpen] = useState<boolean>(false);
  // 모임에서 방문한 날짜 리스트 가져오기
  const {
    data: storedDateList,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchStoredDateOfExhInGroup(exhId, gatherId);

  // Effects
  useEffect(() => {
    if (isError) {
      setIsErrorOpen(true);
    }
  }, [isError]);

  useEffect(() => {
    if (exhId !== 0) {
      refetch();
    }
  }, [exhId]);

  useEffect(() => {
    if (storedDateList) {
      const dates = storedDateList.dateInfoList;
      for (let i = 0; i < dates.length; i++) {
        const date = dates[i].visitDate;

        if (date === selectedDate) {
          handleAlreadyVisit(true);
          break;
        } else {
          handleAlreadyVisit(false);
        }
      }
    }
  }, [selectedDate]);

  const getVisitedDateList = () => {
    var list: MarkedType[] = [];

    if (storedDateList) {
      const dates = storedDateList.dateInfoList;

      for (let i = 0; i < dates.length; i++) {
        var firstColor: string[] = [];
        const date = dates[i].visitDate;

        firstColor.push(calendarColor[0]);
        list.push({
          date: date,
          color: firstColor,
        });
      }
    }
    return list;
  };

  const handleRetryFetch = () => {
    setIsErrorOpen(false);
    refetch();
  };

  return (
    <Container>
      <LoadingModal isLoading={isLoading} />
      <ErrorModal isError={isErrorOpen} retry={handleRetryFetch} />
      <SectionName>날짜 추가</SectionName>
      {/* 방문 날짜 정보 */}
      {exhId === 0 || !storedDateList ? (
        <SelectMsgView>
          <SelectMsgText>전시회를 선택해주세요.</SelectMsgText>
        </SelectMsgView>
      ) : (
        // 달력
        <CalendarSelectDateFrame
          initDate={initDate}
          markedDates={getVisitedDateList()}
          selectedDate={selectedDate}
          onSelectedDate={handleSelectDate}
        />
      )}
    </Container>
  );
};

export default SelectNewVisitDateForGathering;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  gap: ${wp(3)}px;
`;

const SectionName = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const SelectMsgView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: ${hp(2)}px;
`;

const SelectMsgText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${hp(0.9)}px;
`;

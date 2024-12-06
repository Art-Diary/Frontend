import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {dateToString} from '~/utils/date';
import {
  calendarColor,
  findGatherColor,
} from '../../components/calendar/calendarColor';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useIsFocused} from '@react-navigation/native';
import ExhListOfDayInCalendar from '../../components/calendar/ExhListOfDayInCalendar';
import {useFetchCalendar} from '~/api/queries/calendar';
import {showToast} from '~/components/common/modal/toastConfig';
import {BACK_COLOR} from '~/components/common/colors';
import {useDateFromExhInfo} from '~/zustand/calendar/dateFromExh';
import {RefreshControl} from 'react-native';
import {GatheringColorInfo, MarkedType} from '~/types';
import CalendarGatheringSelector from '~/components/calendar/CalendarGatheringSelector';
import {widthSizePercentage as wp} from '~/components/common/ResponsiveSize';

const CalendarScreen = () => {
  const isFocused = useIsFocused();
  const tabIdentifierInfo = useTabIdentifierInfo();
  const {updateTab} = useTabIdentifierActions();
  const {date: dateFromExhInfo} = useDateFromExhInfo();
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(
    dateFromExhInfo ?? dateToString(new Date()),
  );
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(
    dateFromExhInfo ?? dateToString(new Date()),
  );
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<MarkedType[]>([]);
  // 모임 선택 selector - item
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [gatherId, setGatherId] = useState<number>(-1);
  const {
    data: exhInfoOfDays,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchCalendar(
    gatherId === -1 ? 'alone' : gatherId === -2 ? 'all' : 'gather',
    gatherId > -1 ? gatherId : null,
    Number(changeMonth.split('.')[0]),
    Number(changeMonth.split('.')[1]),
  );
  const [gatherColorList, setGatherColorList] = useState<GatheringColorInfo[]>(
    [],
  );

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'calendar') {
        updateTab('calendar');
      }
      setRefreshing(true);
    }
  }, [isFocused, changeMonth, gatherId]);

  useEffect(() => {
    if (isError) {
      showToast('일정 조회 실패 ;(');
    }
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isError, isLoading]);

  useEffect(() => {
    if (isSuccess && exhInfoOfDays.length !== 0) {
      var list: MarkedType[] = [];

      for (let i = 0; i < exhInfoOfDays.length; i++) {
        if (exhInfoOfDays[i].scheduleInfoList !== undefined) {
          var colorList: string[] = [];
          if (gatherId === -2) {
            const infoList = exhInfoOfDays[i].scheduleInfoList;

            for (let k = 0; k < infoList.length; k++) {
              let findColor = findGatherColor(
                gatherColorList,
                infoList[k].gatherId,
              );

              if (!colorList.includes(findColor)) {
                colorList.push(findColor);
              }
            }
          } else if (gatherId === -1) {
            colorList.push(calendarColor[0]);
          } else {
            colorList.push(findGatherColor(gatherColorList, gatherId));
          }
          list.push({
            date:
              changeMonth.split('.')[0] +
              '.' +
              changeMonth.split('.')[1] +
              '.' +
              ('0' + exhInfoOfDays[i].day).slice(-2),
            color: colorList,
          });
        }
      }
      setMarkedDates(list);
    }
  }, [exhInfoOfDays]);

  const handleRefetch = async () => {
    await refetch().then(() => {
      setRefreshing(false);
    });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
  };

  return (
    <RefreshView
      data={['']}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      renderItem={({}) => (
        <>
          <CalendarGatheringSelector
            handleRefetch={handleRefetch}
            refreshing={refreshing}
            handleGatherId={setGatherId}
            markedDates={markedDates}
            handleSelectedDate={setSelectedDate}
            initDate={dateFromExhInfo ?? dateToString(new Date())}
            handleChangeMonth={setChangeMonth}
            handleGatherColorList={setGatherColorList}
            gatherColorList={gatherColorList}
          />
          <ExhListOfDayInCalendar
            selectedDateInfo={{
              selectedDate,
              year: Number(changeMonth.split('.')[0]),
              month: Number(changeMonth.split('.')[1]),
            }}
            gatherColorList={gatherColorList}
            exhListOfDay={exhInfoOfDays}
          />
          {/* {openLoading && <LoadingModal message="일정 조회 중 :)" />} */}
        </>
      )}
    />
  );
};

export default CalendarScreen;

/** style */
const RefreshView = styled.FlatList`
  flex: 1;
  flex-direction: column;
  background-color: ${BACK_COLOR};
  padding: ${wp(1.3)}px;
`;

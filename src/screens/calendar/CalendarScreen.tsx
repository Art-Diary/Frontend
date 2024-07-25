import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {dateToString} from '~/utils/Date';
import {calendarColor} from './calendarColor';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useIsFocused} from '@react-navigation/native';
import GatheringSelector from './GatheringSelector';
import ExhListOfDayInCalendar from './ExhListOfDayInCalendar';
import {useFetchCalendar} from '~/api/queries/calendar';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {showToast} from '~/components/common/modal/toastConfig';
import {BACK_COLOR} from '~/components/common/colors';
import {useDateFromExhInfo} from '~/zustand/calendar/dateFromExh';
import {RefreshControl} from 'react-native';

export interface IPicker {
  label: string;
  value: string;
  image: {};
}

interface MarkedType {
  date: string;
  color: string[];
}

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
  const [selectorItems, setSelectorItems] = useState<IPicker[]>([]);
  // 모임 선택 selector - value
  const [selectedValue, setSelectedValue] = useState<string>('-1');
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: exhInfoOfDays,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchCalendar(
    Number(selectedValue) === -1
      ? 'alone'
      : Number(selectedValue) === -2
        ? 'all'
        : 'gather',
    Number(selectedValue) > -1 ? Number(selectedValue) : null,
    Number(changeMonth.split('.')[0]),
    Number(changeMonth.split('.')[1]),
  );

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab !== 'calendar') {
        updateTab('calendar');
      }
      setRefreshing(true);
    }
  }, [isFocused, changeMonth, selectedValue]);

  useEffect(() => {
    if (isError) {
      showToast('일정 조회 실패 ;(');
    }
  }, [isError]);

  useEffect(() => {
    if (isLoading) {
      setOpenLoading(true);
    } else {
      setOpenLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess && exhInfoOfDays.length !== 0) {
      var list: MarkedType[] = [];

      for (let i = 0; i < exhInfoOfDays.length; i++) {
        if (exhInfoOfDays[i].scheduleInfoList !== undefined) {
          var colorList: string[] = [];

          if (selectedValue === '-2') {
            const infoList = exhInfoOfDays[i].scheduleInfoList;

            for (let k = 0; k < infoList.length; k++) {
              let findColor = findGatherColor(infoList[k].gatherId);

              if (!colorList.includes(findColor)) {
                colorList.push(findColor);
              }
            }
          } else {
            colorList.push(calendarColor[0]);
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

  const findGatherColor = (gatherId: number): string => {
    if (gatherId === null) {
      return calendarColor[0];
    }
    for (let i = 0; i < selectorItems.length - 1; i++) {
      if (Number(selectorItems[i].value) === gatherId) {
        return calendarColor[i];
      }
    }
    return 'black';
  };

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
          <CustomCalendar
            initDate={dateFromExhInfo ?? dateToString(new Date())}
            onSelectedDate={setSelectedDate}
            markedDates={markedDates}
            setChangeMonth={setChangeMonth}>
            <GatheringSelector
              handleSelectorItems={setSelectorItems}
              selectorItems={selectorItems}
              handleSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
              handleRefetch={handleRefetch}
              refreshing={refreshing}
            />
          </CustomCalendar>
          <ExhListOfDayInCalendar
            selectedDate={selectedDate}
            gatherId={Number(selectedValue)}
            selectorItems={selectorItems}
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
`;

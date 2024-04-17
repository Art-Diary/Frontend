import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
import {heightPercentage as hp} from '~/components/common/ResponsiveSize';
import ExhListOfDate from './ExhListOfDate';
import {useFetchGatheringList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {SelectCountry} from 'react-native-element-dropdown';
import {imageDataset} from './imageDataset';
import {calendarColor} from './calendarColor';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useIsFocused} from '@react-navigation/native';

interface IPicker {
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
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(dateToString(new Date()));
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<MarkedType[]>([]);
  // api 요청에 대한 응답 데이터
  const [datas, setDatas] = useState<any[]>([]);
  // 모임 선택 selector - item
  const [items, setItems] = useState<IPicker[]>([]);
  // 모임 선택 selector - value
  const [value, setValue] = useState<string>('-1');
  const {
    data: gatheringList,
    isLoading,
    isError,
    isSuccess,
  } = useFetchGatheringList();

  useEffect(() => {
    if (isFocused) {
      if (tabIdentifierInfo.tab === 'mydiary') {
        updateTab('calendar');
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSuccess) {
      var list = [];
      const image = {uri: imageDataset};

      list.push({
        label: '혼자',
        value: '-1',
        image: image,
      });
      for (let i = 0; i < gatheringList.length; i++) {
        list.push({
          label: gatheringList[i].gatherName,
          value: gatheringList[i].gatherId,
          image: image,
        });
      }
      list.push({
        label: '모두',
        value: '-2',
        image: image,
      });
      setItems(list);
    }
  }, [isSuccess, setItems, gatheringList]);

  useEffect(() => {
    // 응답 데이터가 변경될 때마다
    if (datas.length !== 0) {
      var list: MarkedType[] = [];

      for (let i = 0; i < datas.length; i++) {
        if (datas[i].scheduleInfoList !== undefined) {
          var colorList: string[] = [];

          if (value === '-2') {
            const infoList = datas[i].scheduleInfoList;

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
            date: JoinDateWithDot([
              Number(changeMonth.split('.')[0]),
              Number(changeMonth.split('.')[1]),
              datas[i].day,
            ]),
            color: colorList,
          });
        }
      }
      setMarkedDates(list);
    }
  }, [datas]);

  if (isError) {
    return <ErrorMessageView message="모임 목록 조회 실패:(" />;
  }

  if (isLoading) {
    return <LoadingModal message="모임 목록 조회 중:)" />;
  }

  const findGatherColor = (gatherId: number): string => {
    if (gatherId === null) {
      return calendarColor[0];
    }
    for (let i = 0; i < items.length - 1; i++) {
      if (Number(items[i].value) === gatherId) {
        return calendarColor[i];
      }
    }
    return 'black';
  };

  return (
    <Container>
      <CustomCalendar
        onSelectedDate={setSelectedDate}
        markedDates={markedDates}
        setChangeMonth={setChangeMonth}>
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={value}
          data={items}
          valueField="value"
          labelField="label"
          imageField="image"
          placeholder="Select country"
          onChange={e => {
            setValue(e.value);
          }}
        />
      </CustomCalendar>
      <ExhListOfDate
        changeMonth={changeMonth}
        selectedDate={selectedDate}
        setDatas={setDatas}
        gatherId={Number(value)}
        items={items}
      />
    </Container>
  );
};

export default CalendarScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #f6f6f6;
  padding-bottom: ${hp(5)}px;
`;

const styles = StyleSheet.create({
  dropdown: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 8,
    borderColor: '#ff6f61',
    borderWidth: 1,
    marginTop: -8,
  },
  imageStyle: {
    width: 0,
    height: 0,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'omyu pretty',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'omyu pretty',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

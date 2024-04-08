import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
import {heightPercentage as hp} from '~/components/common/ResponsiveSize';
import DropDownPicker from 'react-native-dropdown-picker';
import ExhListOfDate from './ExhListOfDate';

const CalendarScreen = () => {
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(dateToString(new Date()));
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  // api 요청에 대한 응답 데이터
  const [datas, setDatas] = useState<any[]>([]);
  // 모임 선택 drop_picker - open
  // const [open, setOpen] = useState(false);
  // // 모임 선택 drop_picker - item
  // const [items, setItems] = useState([
  //   {label: '개인', value: '개인'},
  //   {label: '모임', value: '모임'},
  //   {label: '모두', value: '모두'},
  // ]);
  // // 모임 선택 drop_picker - value
  // const [getValue, setValue] = useState<string>('오잉');

  useEffect(() => {
    // 응답 데이터가 변경될 때마다
    if (datas.length !== 0) {
      var list: string[] = [];
      for (let i = 0; i < datas.length; i++) {
        if (datas[i].scheduleInfoList !== undefined) {
          list.push(
            JoinDateWithDot([
              Number(changeMonth.split('.')[0]),
              Number(changeMonth.split('.')[1]),
              datas[i].day,
            ]),
          );
        }
      }
      setMarkedDates(list);
    }
  }, [datas]);

  return (
    <Container>
      <CustomCalendar
        onSelectedDate={setSelectedDate}
        markedDates={markedDates}
        setChangeMonth={setChangeMonth}>
        {/* <DropDownPicker
          style={pickerStyle.box}
          textStyle={pickerStyle.gatheringName}
          open={open}
          value={getValue}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="혼자"
        /> */}
      </CustomCalendar>
      <ExhListOfDate
        changeMonth={changeMonth}
        selectedDate={selectedDate}
        setDatas={setDatas}
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

const pickerStyle = StyleSheet.create({
  box: {
    width: '25%',
    justifyContent: 'flex-end',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ff6f61',
  },
  gatheringName: {
    fontSize: 17,
    color: '#3c4045',
    fontFamily: 'omyu pretty',
  },
});

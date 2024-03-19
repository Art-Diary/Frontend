import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface Matrix {
  day: number | null;
  isInCurrentMonth: boolean;
}

const days = ['일', '월', '화', '수', '목', '금', '토'];

const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const CustomCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 월
  const [selectedDay, setSelectedDay] = useState(null); // 선택한 날짜
  const [specificDates, setSpecificDates] = useState([]); // 특정 날짜
  const [checkDate, setCheckDate] = useState(''); // 선택한 날짜 포맷 'YYYY-MM-DD'

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleDayPress = (item: Matrix) => {
    console.log(item.day);
  };

  const generateMatrix = () => {
    var matrix: Matrix[][] = [];
    // matrix[0] = days;

    var year = currentMonth.getFullYear();
    var month = currentMonth.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var maxDays = new Date(year, month + 1, 0).getDate();

    var counter = -firstDay + 1;

    for (var col = 0; col < 7; col++) {
      matrix[col] = [];
      for (var row = 0; row < 7; row++) {
        let cellValue = counter > 0 && counter <= maxDays ? counter : null;
        matrix[col][row] = {
          day: cellValue,
          isInCurrentMonth: counter > 0 && counter <= maxDays,
        };
        counter++;
      }
      if (counter > 0 && counter > maxDays) {
        break;
      }
    }
    return matrix;
  };

  const renderCalendar = () => {
    var matrix = generateMatrix();
    return matrix.map((col, colIndex) => {
      var colItems = col.map((item, rowIndex) => {
        return (
          <CellTouchable key={rowIndex} onPress={() => handleDayPress(item)}>
            <CellText>{item.day}</CellText>
          </CellTouchable>
        );
      });
      return (
        <View style={{flexDirection: 'row'}} key={colIndex}>
          {colItems}
        </View>
      );
    });
  };

  return (
    <Container>
      <CalHeader>
        <TouchableOpacity onPress={goToPreviousMonth}>
          <MonthLabel>&lt;</MonthLabel>
        </TouchableOpacity>
        <MonthLabel>{months[currentMonth.getMonth()]}월</MonthLabel>
        <TouchableOpacity onPress={goToNextMonth}>
          <MonthLabel>&gt;</MonthLabel>
        </TouchableOpacity>
      </CalHeader>
      <WeekDayView>
        {days.map((day, index) => (
          <CellText key={index}>{day}</CellText>
        ))}
      </WeekDayView>
      <CalendarView>{renderCalendar()}</CalendarView>
    </Container>
  );
};

export default CustomCalendar;

/** style */
const Container = styled.View`
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  width: 100%;
  padding-top: ${hp(15)}px;
  padding-bottom: ${hp(15)}px;
`;

const CalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding-left: ${wp(20)}px;
  padding-right: ${wp(20)}px;
  padding-bottom: ${hp(15)}px;
  /* padding: 20px; */
  /* padding-top: 15px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px; */
  /* border-width: 1px; */
`;

const MonthLabel = styled.Text`
  font-size: ${fp(16.56)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const CalendarView = styled.View`
  justify-content: space-between;
  height: ${hp(206.08)}px;
  align-items: center;
  padding-left: ${wp(5)}px;
  padding-right: ${wp(5)}px;
`;

const WeekDayView = styled.View`
  flex-direction: row;
  height: ${hp(25)}px;
  justify-content: space-between;
  align-items: center;
  padding-left: ${wp(25)}px;
  padding-right: ${wp(25)}px;
`;

const CellTouchable = styled.TouchableOpacity`
  flex: 1;
  height: ${hp(25)}px;
  justify-content: center;
  align-items: center;
`;

const CellText = styled.Text`
  color: #3c4045;
  font-size: ${fp(14.25)}px;
  font-family: 'omyu pretty';
`;

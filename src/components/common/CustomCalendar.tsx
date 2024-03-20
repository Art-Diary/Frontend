import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import styled from 'styled-components/native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface CalendarProps {
  onSelectedDate: (selectedDate: string) => void;
  markedDates: string[];
}

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

const CustomCalendar: React.FC<CalendarProps> = ({
  onSelectedDate,
  markedDates,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 월
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택한 날짜

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleDayPress = (item: Matrix) => {
    if (item.day !== null) {
      const selectedFullDate = makeFullDate(item.day);

      onSelectedDate(selectedFullDate);
      setSelectedDate(selectedFullDate);
    }
  };

  const makeFullDate = (day: number) => {
    const month = currentDate.getMonth() + 1;

    return (
      currentDate.getFullYear() +
      '.' +
      ('0' + month).slice(-2) +
      '.' +
      ('0' + day).slice(-2)
    );
  };

  const generateMatrix = () => {
    // matrix 생성 (달력을 배열로)
    var matrix: Matrix[][] = [];

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
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
    // matrix 생성 (달력을 배열로)
    var matrix = generateMatrix();
    // matrix를 화면으로 구성
    return matrix.map((col, colIndex) => {
      var colItems = col.map((item, rowIndex) => {
        var today = new Date();
        var todayStr =
          today.getFullYear() +
          '.' +
          ('0' + (today.getMonth() + 1)).slice(-2) +
          '.' +
          ('0' + today.getDate()).slice(-2);
        var itemDate;
        var isToday = false;
        var isMarked = false;

        if (item.day !== null) {
          itemDate = makeFullDate(item.day);
          for (var marked = 0; marked < markedDates.length; marked++) {
            if (itemDate === markedDates[marked]) {
              isMarked = true;
              break;
            }
          }
          isToday = itemDate === todayStr ? true : false;
        }
        return (
          <CellTouchable key={rowIndex} onPress={() => handleDayPress(item)}>
            <Circle isToday={isToday} isTouched={itemDate === selectedDate}>
              <CellText isTouched={itemDate === selectedDate}>
                {item.day}
              </CellText>
              {isMarked && <MarkedDot isTouched={itemDate === selectedDate} />}
            </Circle>
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
        <View style={{flexDirection: 'row'}}>
          {currentDate.getFullYear() !== new Date().getFullYear() && (
            <MonthLabel>{currentDate.getFullYear()}년 </MonthLabel>
          )}
          <MonthLabel>{months[currentDate.getMonth()]}월</MonthLabel>
        </View>
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
  padding-bottom: ${hp(5)}px;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  gap: ${hp(7.36)}px;
`;

const CalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const MonthLabel = styled.Text`
  font-size: ${fp(16.56)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const CalendarView = styled.View`
  justify-content: space-between;
  height: ${hp(206.08)}px;
`;

const WeekDayView = styled.View`
  flex-direction: row;
  height: ${hp(25)}px;
  justify-content: space-between;
  align-items: center;
  padding-left: ${wp(15)}px;
  padding-right: ${wp(15)}px;
  padding-bottom: ${hp(5)}px;
  border-color: #e9e9e9;
  border-bottom-width: 1px;
`;

const CellTouchable = styled.TouchableOpacity`
  flex: 1;
  /* height: ${hp(25)}px; */
  flex-direction: column;
  align-items: center;
`;

interface CircleProps {
  isToday: boolean;
  isTouched: boolean;
}

const CellText = styled.Text<CircleProps>`
  color: ${(props: CircleProps) => (props.isTouched ? 'white' : '#3c4045')};
  font-size: ${fp(14.25)}px;
  font-family: 'omyu pretty';
`;

const MarkedDot = styled.View<CircleProps>`
  background-color: ${(props: CircleProps) =>
    props.isTouched ? 'white' : '#ff6f61'};
  width: 5px;
  height: 5px;
  border-radius: 50px;
`;
const Circle = styled.View<CircleProps>`
  gap: 3px;
  width: ${wp(31.28)}px;
  height: ${wp(31.28)}px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: ${wp(0.92)}px;
  border-color: ${(props: CircleProps) =>
    !props.isTouched && props.isToday ? '#ff6f61' : 'white'};
  background-color: ${(props: CircleProps) =>
    props.isTouched ? '#ff6f61' : 'white'};
`;

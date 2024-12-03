import React, {ReactNode, useEffect, useState} from 'react';
import {View} from 'react-native-animatable';
import styled from 'styled-components/native';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {dateToString, days, months} from '~/utils/date';
import {BACK_COLOR, DEFAULT_TEXT, MAIN_COLOR, MIDDLE_GREY} from './colors';
import {FONT_NAME} from './style';
import CustomTouchable from './CustomTouchable';
import {MarkedType} from '~/types';

interface CalendarProps {
  initDate: string; // 초기 날짜
  onSelectedDate: (selectedDate: string) => void; // 선택 날짜 set
  markedDates: MarkedType[]; // 마크 표시된 날짜 리스트
  setChangeMonth?: (changeMonth: string) => void; // 달 바꿈 set
  children?: ReactNode;
  mainColor?: string;
}

interface Matrix {
  day: number | null;
  isInCurrentMonth: boolean;
}

const CalendarFrame: React.FC<CalendarProps> = ({
  initDate,
  onSelectedDate,
  markedDates,
  setChangeMonth,
  children,
  mainColor,
}) => {
  const splitDate = initDate.split('.');
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    ),
  ); // 현재 월
  const [selectedDate, setSelectedDate] = useState<string>(initDate); // 선택한 날짜

  useEffect(() => {
    const date: Date = new Date(
      Number(splitDate[0]),
      Number(splitDate[1]) - 1,
      Number(splitDate[2]),
    );
    setCurrentDate(date);
  }, [initDate]);

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    if (setChangeMonth) {
      const change = dateToString(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
      setChangeMonth(change);
      setSelectedDate(change);
      onSelectedDate(change);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    if (setChangeMonth) {
      const change = dateToString(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
      );
      setChangeMonth(change);
      setSelectedDate(change);
      onSelectedDate(change);
    }
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
        var itemDate: string = '';
        var dateNum = 0;
        var isToday = false;
        var isMarked = false;

        if (item.day !== null && markedDates !== undefined) {
          itemDate = makeFullDate(item.day); // yy.MM.dd
          for (var marked = 0; marked < markedDates.length; marked++) {
            if (itemDate === markedDates[marked].date) {
              // 마킹됐는지 확인
              isMarked = true;
              dateNum = marked;
              break;
            }
          }
          isToday = itemDate === todayStr ? true : false;
        }
        return (
          <CellTouchable
            key={rowIndex}
            activeOpacity={0.6}
            onPress={() => handleDayPress(item)}>
            <Circle
              isToday={isToday}
              isTouched={itemDate === selectedDate}
              color={mainColor}>
              <CellText isTouched={itemDate === selectedDate}>
                {item.day}
              </CellText>
              {isMarked && (
                <MarkedDotWrapper>
                  {/* 모두 일때 한 날짜에 여러 모임이 갔을 경우 표시 */}
                  {markedDates &&
                    markedDates[dateNum].color.map((color, colorIndex) => {
                      return (
                        <MarkedDot
                          key={colorIndex}
                          color={
                            itemDate === selectedDate && markedDates
                              ? 'white'
                              : markedDates
                                ? color
                                : 'white'
                          }
                        />
                      );
                    })}
                </MarkedDotWrapper>
              )}
            </Circle>
          </CellTouchable>
        );
      });
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          key={colIndex}>
          {colItems}
        </View>
      );
    });
  };

  return (
    <Container>
      <CalHeader>
        <DateWrapper>
          <CustomTouchable
            onPress={goToPreviousMonth}
            style={{
              paddingHorizontal: wp(3),
              paddingVertical: wp(1),
            }}>
            <ArrowLabel>&lt;</ArrowLabel>
          </CustomTouchable>
          <View style={{flexDirection: 'row'}}>
            {currentDate.getFullYear() !== new Date().getFullYear() && (
              <MonthLabel>{currentDate.getFullYear()}년 </MonthLabel>
            )}
            <MonthLabel>{months[currentDate.getMonth()]}월</MonthLabel>
          </View>
          <CustomTouchable
            onPress={goToNextMonth}
            style={{
              paddingHorizontal: wp(3),
              paddingVertical: wp(1),
            }}>
            <ArrowLabel>&gt;</ArrowLabel>
          </CustomTouchable>
        </DateWrapper>
      </CalHeader>
      {children}
      {/* 요일 */}
      <WeekDayView>
        {days.map((day, index) => (
          <WeekDayCell key={index}>
            <CellText isDay>{day}</CellText>
          </WeekDayCell>
        ))}
      </WeekDayView>
      {/* 날짜 */}
      <CalendarView>{renderCalendar()}</CalendarView>
    </Container>
  );
};

export default CalendarFrame;

/** style */
const Container = styled.View`
  flex-direction: column;
  background-color: ${BACK_COLOR};
  width: 100%;
  padding-top: ${hp(1.8)}px;
`;

const CalHeader = styled.View`
  padding-left: ${wp(0.2)}px;
  padding-top: ${hp(0.5)}px;
  padding-bottom: ${hp(0.5)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${hp(1.5)}px;
`;

const ArrowLabel = styled.Text`
  padding-left: ${wp(1)}px;
  padding-right: ${wp(1)}px;
  font-size: ${rf(15.8)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const MonthLabel = styled.Text`
  font-size: ${rf(17)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

const CalendarView = styled.View`
  justify-content: space-between;
  height: ${hp(31)}px;
`;

const WeekDayView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeekDayCell = styled.View`
  align-items: center;
  width: ${wp(7.5)}px;
  height: ${wp(7.5)}px;
`;

const CellTouchable = styled.TouchableOpacity`
  align-items: center;
`;

interface CircleProps {
  isToday: boolean;
  isTouched: boolean;
  color: string;
  isDay: boolean;
}

const CellText = styled.Text<CircleProps>`
  color: ${(props: CircleProps) =>
    props.isTouched
      ? 'white'
      : props.isDay
        ? `${MIDDLE_GREY}`
        : `${DEFAULT_TEXT}`};
  font-size: ${rf(15)}px;
  font-family: ${FONT_NAME};
`;

const MarkedDotWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MarkedDot = styled.View<CircleProps>`
  background-color: ${(props: CircleProps) => props.color};
  width: ${wp(0.9)}px;
  height: ${wp(0.9)}px;
  border-radius: ${wp(50)}px;
`;

const Circle = styled.View<CircleProps>`
  gap: ${wp(0.3)}px;
  width: ${wp(7.5)}px;
  height: ${wp(7.5)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${wp(50)}px;
  border-width: ${wp(0.3)}px;
  border-color: ${(props: CircleProps) =>
    !props.isTouched && props.isToday ? `${props.color}` : `${BACK_COLOR}`};
  background-color: ${(props: CircleProps) =>
    props.isTouched ? `${props.color}` : `${BACK_COLOR}`};
`;

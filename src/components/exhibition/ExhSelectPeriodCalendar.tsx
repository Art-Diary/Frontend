import React, {useState} from 'react';
import {View} from 'react-native-animatable';
import styled from 'styled-components/native';
import {DARK_GREY, MAIN_COLOR} from '~/components/common/colors';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '~/components/common/style';
import {changeDotToHyphen, days, months} from '~/utils/date';

interface CalendarProps {
  selectStartPeriod: string;
  selectEndPeriod: string;
  onSelectStartPeriod: (selectedDate: string) => void;
  onSelectEndPeriod: (selectedDate: string) => void;
}

interface Matrix {
  day: number | null;
  isInCurrentMonth: boolean;
}

const ExhSelectPeriodCalendar: React.FC<CalendarProps> = ({
  selectStartPeriod,
  selectEndPeriod,
  onSelectStartPeriod,
  onSelectEndPeriod,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 현재 월
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>(selectStartPeriod); // 선택한 시작 날짜
  const [selectedEndDate, setSelectedEndDate] =
    useState<string>(selectEndPeriod); // 선택한 종료 날짜

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
      const selectedDate = changeDotToHyphen(selectedFullDate);
      const startDate = changeDotToHyphen(selectedStartDate);
      const endDate = changeDotToHyphen(selectedEndDate);

      // 시작날짜, 종료날짜 구분
      if (startDate === '' && endDate === '') {
        setSelectedStartDate(selectedFullDate);
        onSelectStartPeriod(selectedFullDate);
      } else if (startDate !== '' && endDate === '') {
        if (selectedDate >= startDate) {
          setSelectedEndDate(selectedFullDate);
          onSelectEndPeriod(selectedFullDate);
        } else {
          setSelectedEndDate(selectedStartDate);
          onSelectEndPeriod(selectedStartDate);
          setSelectedStartDate(selectedFullDate);
          onSelectStartPeriod(selectedFullDate);
        }
      } else if (startDate !== '' && endDate !== '') {
        if (selectedDate <= startDate) {
          setSelectedStartDate(selectedFullDate);
          onSelectStartPeriod(selectedFullDate);
        } else if (selectedDate >= endDate) {
          setSelectedEndDate(selectedFullDate);
          onSelectEndPeriod(selectedFullDate);
        } else {
          setSelectedStartDate(selectedFullDate);
          onSelectStartPeriod(selectedFullDate);
          setSelectedEndDate('');
          onSelectEndPeriod('');
        }
      }
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
        var isToday = false;
        var isHalfScheduled = false;
        var isInSchedule = false;
        var isStartDate = false;
        var isEndDate = false;

        if (item.day !== null) {
          itemDate = makeFullDate(item.day);
          isToday = itemDate === todayStr ? true : false;
          const startDate = changeDotToHyphen(selectedStartDate);
          const endDate = changeDotToHyphen(selectedEndDate);
          itemDate = changeDotToHyphen(itemDate);

          if (
            ((selectedStartDate !== '' && selectedEndDate === '') ||
              (selectedStartDate === '' && selectedEndDate !== '')) &&
            (startDate === itemDate || itemDate === endDate)
          ) {
            // 시작과 종료 둘 중 하나만 있을 때
            isHalfScheduled = true;
          }
          if (
            startDate !== '' &&
            endDate !== '' &&
            startDate <= itemDate &&
            itemDate <= endDate
          ) {
            // 시작과 종료 사이의 날짜인지
            isInSchedule = true;
            if (startDate === itemDate) {
              isStartDate = true;
            } else if (endDate === itemDate) {
              isEndDate = true;
            }
          }
        }
        //

        return (
          <CellTouchable
            key={rowIndex}
            activeOpacity={0.6}
            onPress={() => handleDayPress(item)}
            isInSchedule={isInSchedule}
            isStartDate={isStartDate}
            isEndDate={isEndDate}>
            <Cell isToday={isToday} isHalfScheduled={isHalfScheduled}>
              <CellText isInSchedule={isInSchedule || isHalfScheduled}>
                {item.day}
              </CellText>
            </Cell>
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
        <DateWrapper>
          <CustomTouchable onPress={goToPreviousMonth}>
            <ArrowLabel>&lt;</ArrowLabel>
          </CustomTouchable>
          <View style={{flexDirection: 'row'}}>
            {currentDate.getFullYear() !== new Date().getFullYear() && (
              <MonthLabel>{currentDate.getFullYear()}년 </MonthLabel>
            )}
            <MonthLabel>{months[currentDate.getMonth()]}월</MonthLabel>
          </View>
          <CustomTouchable onPress={goToNextMonth}>
            <ArrowLabel>&gt;</ArrowLabel>
          </CustomTouchable>
        </DateWrapper>
      </CalHeader>
      {/* 요일 */}
      <WeekDayView>
        {days.map((day, index) => (
          <CellText key={index}>{day}</CellText>
        ))}
      </WeekDayView>
      {/* 날짜 */}
      <CalendarView>{renderCalendar()}</CalendarView>
    </Container>
  );
};

export default ExhSelectPeriodCalendar;

/** style */
const Container = styled.View`
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: ${wp(2)}px;
  width: 100%;
  padding-top: ${hp(1.8)}px;
  padding-bottom: ${hp(2.2)}px;
  padding-left: ${wp(2.9)}px;
  padding-right: ${wp(2.9)}px;
  gap: ${hp(1.5)}px;
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
  gap: ${wp(2.5)}px;
`;

const ArrowLabel = styled.Text`
  padding-left: ${wp(1)}px;
  padding-right: ${wp(1)}px;
  font-size: ${rf(15.8)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const MonthLabel = styled.Text`
  font-size: ${rf(15.8)}px;
  color: ${DARK_GREY};
  font-family: ${FONT_NAME};
`;

const CalendarView = styled.View`
  justify-content: space-between;
  height: ${hp(38)}px;
`;

const WeekDayView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${wp(4.3)}px;
  padding-right: ${wp(4.3)}px;
  padding-top: ${hp(0.5)}px;
  padding-bottom: ${hp(1.9)}px;
  border-color: #e9e9e9;
  border-bottom-width: ${ITEM_BORDER_WIDTH}px;
`;

interface CellTouchProps {
  isInSchedule: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
}

const CellTouchable = styled.TouchableOpacity<CellTouchProps>`
  flex: 1;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: ${(props: CellTouchProps) =>
    props.isStartDate ? `${wp(50)}px` : '0px'};
  border-bottom-left-radius: ${(props: CellTouchProps) =>
    props.isStartDate ? `${wp(50)}px` : '0px'};
  border-top-right-radius: ${(props: CellTouchProps) =>
    props.isEndDate ? `${wp(50)}px` : '0px'};
  border-bottom-right-radius: ${(props: CellTouchProps) =>
    props.isEndDate ? `${wp(50)}px` : '0px'};
  background-color: ${(props: CellTouchProps) =>
    props.isInSchedule ? `${MAIN_COLOR}` : 'white'};
`;

interface CellProps {
  isToday: boolean;
  isHalfScheduled: boolean;
}

const Cell = styled.View<CellProps>`
  gap: ${wp(0.3)}px;
  width: ${wp(7.5)}px;
  height: ${wp(7.5)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props: CellProps) =>
    props.isToday || props.isHalfScheduled ? `${wp(50)}px` : '0px'};
  border-width: ${(props: CellProps) =>
    props.isToday ? `${wp(0.3)}px` : '0px'};
  border-color: ${(props: CellProps) =>
    props.isToday ? ` ${MAIN_COLOR}` : 'white'};
  background-color: ${(props: CellProps) =>
    props.isHalfScheduled ? ` ${MAIN_COLOR}` : 'transparent'};
`;

interface CellTextProps {
  isInSchedule: boolean;
}

const CellText = styled.Text<CellTextProps>`
  color: ${(props: CellTextProps) =>
    props.isInSchedule ? 'white' : `${DARK_GREY}`};
  font-size: ${rf(13)}px;
  font-family: ${FONT_NAME};
`;

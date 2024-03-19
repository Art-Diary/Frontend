import React, {useEffect, useState} from 'react';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';

interface DateValue {
  date: number[];
  weekday: string;
}

interface VisitDatesProps {
  myStoredDateListOfExh: any;
  value: string | null;
}

const VisitDates: React.FC<VisitDatesProps> = ({
  myStoredDateListOfExh,
  value,
}) => {
  const [storeValue, setStoreValue] = useState<string | null>(null);
  const [chooseDate, setChooseDate] = useState<string | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (storeValue !== value) {
      setStoreValue(value);
      setSelectedItemIndex(null);
    }
  }, [value, storeValue]);

  const onPressVisitDate = (item: DateValue, index: number) => {
    setChooseDate(item.date[0] + '-' + item.date[1] + '-' + item.date[2]);
    if (selectedItemIndex !== index) {
      setSelectedItemIndex(index);
    } else {
      setSelectedItemIndex(null);
    }
  };

  const onPressNextButton = () => {
    // chooseDate가지고 다음 페이지로 이동
  };

  const onPressAddDate = () => {
    // 다음 페이지로 이동
  };

  const getVisitDates = (value: string | null): DateValue[] => {
    var isSolo: boolean = false;
    var id: number;
    var visitDates: DateValue[] = [];
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    let dates: number[][] = [];

    if (value === null) {
      return visitDates;
    }
    if (value.includes('userExhId=')) {
      isSolo = true;
      id = Number(value.split('=')[1]);
    } else {
      id = Number(value.split('=')[1]);
    }
    for (let index = 0; index < myStoredDateListOfExh.length; index++) {
      if (
        isSolo &&
        myStoredDateListOfExh[index].userExhId !== undefined &&
        myStoredDateListOfExh[index].userExhId === id
      ) {
        dates = myStoredDateListOfExh[index].dates;
        break;
      } else if (
        !isSolo &&
        myStoredDateListOfExh[index].gatheringExhId !== undefined &&
        myStoredDateListOfExh[index].gatheringExhId === id
      ) {
        dates = myStoredDateListOfExh[index].dates;
        break;
      }
    }
    for (let dateIndex = 0; dateIndex < dates.length; dateIndex++) {
      visitDates.push({
        date: dates[dateIndex],
        weekday:
          WEEKDAY[
            new Date(
              dates[dateIndex][0],
              dates[dateIndex][1] - 1,
              dates[dateIndex][2],
            ).getDay()
          ],
      });
    }
    return visitDates;
  };

  return (
    <>
      {/* 날짜 목록 */}
      <AddDateGroupView>
        <GroupText>방문 날짜</GroupText>
        {value?.includes('userExhId=') && (
          <TouchableOpacity onPress={onPressAddDate}>
            <AddDateText>추가</AddDateText>
          </TouchableOpacity>
        )}
      </AddDateGroupView>
      <Dates>
        <FlatList
          data={getVisitDates(value)}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => onPressVisitDate(item, index)}
              style={index === selectedItemIndex && pickerStyle.selected}>
              <DateView key={index}>
                <DateText>
                  {item.date[0]}.{item.date[1] < 10 ? 0 : ''}
                  {item.date[1]}.{item.date[2] < 10 ? 0 : ''}
                  {item.date[2]} ({item.weekday})
                </DateText>
              </DateView>
            </TouchableOpacity>
          )}
        />
      </Dates>
      <TouchableOpacity onPress={onPressNextButton}>
        <NextButton>다음</NextButton>
      </TouchableOpacity>
    </>
  );
};

export default VisitDates;

/** style */
const GroupText = styled.Text`
  font-size: ${fp(18)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const AddDateText = styled.Text`
  font-size: ${fp(17)}px;
  color: #ff6f61;
  font-family: 'omyu pretty';
  border-bottom-width: 1px;
  border-bottom-color: #ff6f61;
`;

const AddDateGroupView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const Dates = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const DateView = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: ${hp(10)}px;
  padding-bottom: ${hp(10)}px;
  border-bottom-width: 0.5px;
  border-bottom-color: #d3d3d3;
`;

const DateText = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
`;

const NextButton = styled.Text`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: #ff6f61;
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;

const pickerStyle = StyleSheet.create({
  selected: {
    backgroundColor: '#fcd2cf',
  },
});

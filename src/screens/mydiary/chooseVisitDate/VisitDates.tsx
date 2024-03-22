import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {JoinDateWithDot, getDateDay} from '~/utils/Date';
import {useMySoloActions} from '~/zustand/mydiary/mySoloStoredDates';
import {useWriteMyDiaryActions} from '~/zustand/mydiary/writeMyDiary';

interface DateValue {
  index: number;
  userExhId: number;
  gatheringExhId: number;
  visitDate: number[];
  weekday: string;
}

interface DateIds {
  userExhId: number;
  gatheringExhId: number;
}

interface VisitDatesProps {
  myStoredDateListOfExh: any;
  value: number | null;
}

const VisitDates: React.FC<VisitDatesProps> = ({
  myStoredDateListOfExh,
  value,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [storeValue, setStoreValue] = useState<number | null>(null); // 모임 선택에 따라 바뀌는 value 값
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  ); // 아이템 선택
  const [selectedIds, setSelectedIds] = useState<DateIds>({
    userExhId: -1,
    gatheringExhId: -1,
  }); // 다음 페이지로 넘어갈 때 사용할 아이템의 userExhId와 gatheringExhId
  const {updateVisitDates} = useMySoloActions();
  const {updateforIds} = useWriteMyDiaryActions();

  useEffect(() => {
    if (storeValue !== value) {
      setStoreValue(value);
      setSelectedItemIndex(null);
    }
  }, [value, storeValue]);

  const onPressVisitDate = (item: DateValue) => {
    if (selectedItemIndex !== item.index) {
      setSelectedItemIndex(item.index);
      setSelectedIds({
        userExhId: item.userExhId === null ? -1 : item.userExhId,
        gatheringExhId: item.gatheringExhId === null ? -1 : item.gatheringExhId,
      });
    } else {
      setSelectedItemIndex(null);
      setSelectedIds({userExhId: -1, gatheringExhId: -1});
    }
  };

  const onPressNextButton = () => {
    // 기록 작성 페이지로 이동
    if (
      (selectedIds.userExhId !== -1 && selectedIds.gatheringExhId === -1) ||
      (selectedIds.userExhId === -1 && selectedIds.gatheringExhId !== -1)
    ) {
      updateforIds(selectedIds.userExhId, selectedIds.gatheringExhId);
      navigation.navigate('WriteMySoloDiary');
    }
  };

  const onPressAddDate = () => {
    // 혼자 방문한 날짜 리스트 추출
    var dates = [];

    if (value === null || value === -1) {
      updateVisitDates([]);
    } else {
      for (let index = 0; index < myStoredDateListOfExh.length; index++) {
        if (
          myStoredDateListOfExh[index].gatherName === undefined &&
          myStoredDateListOfExh[index].index === value
        ) {
          const infoList = myStoredDateListOfExh[index].dateInfoList;
          for (let info = 0; info < infoList.length; info++) {
            dates.push(infoList[info].visitDate);
          }
          break;
        }
      }
      updateVisitDates(dates);
    }
    // 혼자 방문한 전시회 날짜 추가 화면으로 이동
    navigation.navigate('AddSoloVisitDate');
  };

  const getVisitDates = (value: number | null): DateValue[] => {
    var visitDateInfoList: DateValue[] = [];

    if (value === null || value === -1) {
      return visitDateInfoList;
    }
    const dateInfoList = myStoredDateListOfExh[value].dateInfoList;

    for (let index = 0; index < dateInfoList.length; index++) {
      visitDateInfoList.push({
        index: index,
        userExhId: dateInfoList[index].userExhId,
        gatheringExhId: dateInfoList[index].gatheringExhId,
        visitDate: dateInfoList[index].visitDate,
        weekday: getDateDay(dateInfoList[index].visitDate),
      });
    }
    return visitDateInfoList;
  };

  return (
    <>
      {/* 날짜 목록 */}
      <AddDateGroupView>
        <GroupText>방문 날짜</GroupText>
        {value !== null &&
          (value === -1 ||
            myStoredDateListOfExh[value].gatherName === undefined) && (
            <TouchableOpacity onPress={onPressAddDate}>
              <AddDateText>추가</AddDateText>
            </TouchableOpacity>
          )}
      </AddDateGroupView>
      <Dates>
        <FlatList
          data={getVisitDates(value)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onPressVisitDate(item)}
              style={item.index === selectedItemIndex && pickerStyle.selected}>
              <DateView key={item.index}>
                <DateText>
                  {JoinDateWithDot(item.visitDate)} ({item.weekday})
                </DateText>
              </DateView>
            </TouchableOpacity>
          )}
        />
      </Dates>
      {selectedItemIndex !== null ? (
        <TouchableOpacity onPress={onPressNextButton}>
          <NextButton isPressed={true}>전시회 선택 완료</NextButton>
        </TouchableOpacity>
      ) : (
        <NextButton isPressed={false}>전시회 선택 완료</NextButton>
      )}
    </>
  );
};
//D3D3D3
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
  padding: 10px;
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

interface NextButtonProps {
  isPressed: boolean;
}
const NextButton = styled.Text<NextButtonProps>`
  padding: ${hp(10)}px;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isPressed ? '#ff6f61' : '#D3D3D3'};
  color: white;
  font-size: ${fp(17)}px;
  font-family: 'omyu pretty';
`;

const pickerStyle = StyleSheet.create({
  selected: {
    backgroundColor: '#fde2e0',
    borderRadius: 5,
  },
});

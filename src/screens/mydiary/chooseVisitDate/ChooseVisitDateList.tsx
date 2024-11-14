import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import CustomTouchable from '~/components/common/CustomTouchable';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
  MIDDLE_GREY,
} from '~/components/common/colors';
import {
  AREA_FONT_SIZE,
  BUTTON_FONT_SIZE,
  BUTTON_PADDING,
  BUTTON_RADIUS,
  FONT_NAME,
  ITEM_BORDER_WIDTH,
} from '~/components/common/style';
import {getDateDay} from '~/utils/date';
import {MyVisitedDateType} from '~/utils/dataTypes';
import {useMySoloMarkedDatesActions} from '~/zustand/mydiary/mySoloMarkedDates';
import {
  useWriteMyDiaryActions,
  useWriteMyDiaryInfo,
} from '~/zustand/mydiary/writeMyDiary';

interface DateValue {
  index: number;
  exhVisitId: number;
  visitDate: string;
  weekday: string | null;
}

interface VisitDatesProps {
  myStoredDateListOfExh: MyVisitedDateType[];
  value: number | null;
}

const ChooseVisitDateList: React.FC<VisitDatesProps> = ({
  myStoredDateListOfExh,
  value,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [storeValue, setStoreValue] = useState<number | null>(null); // 모임 선택에 따라 바뀌는 value 값
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  ); // 아이템 선택
  const [selectedExhVisitId, setSelectedExhVisitId] = useState<number | null>(
    null,
  ); // 다음 페이지로 넘어갈 때 사용할 아이템의 exhVisitId
  const {updateVisitDates} = useMySoloMarkedDatesActions();
  const {updateforIds} = useWriteMyDiaryActions();
  const writeMyDiaryInfo = useWriteMyDiaryInfo();

  useEffect(() => {
    if (writeMyDiaryInfo.isUpdate && value !== null) {
      const dateInfoList = myStoredDateListOfExh[value].dateInfoList;

      for (let info = 0; info < dateInfoList.length; info++) {
        if (
          writeMyDiaryInfo.exhVisitId &&
          writeMyDiaryInfo.exhVisitId === dateInfoList[info].exhVisitId
        ) {
          setSelectedItemIndex(info);
          setSelectedExhVisitId(writeMyDiaryInfo.exhVisitId);
        }
      }
    }
    if (storeValue !== value) {
      setStoreValue(value);
      setSelectedItemIndex(null);
    }
  }, [value, storeValue]);

  const onPressVisitDate = (item: DateValue) => {
    if (selectedItemIndex !== item.index) {
      setSelectedItemIndex(item.index);
      setSelectedExhVisitId(item.exhVisitId);
    } else {
      setSelectedItemIndex(null);
      setSelectedExhVisitId(null);
    }
  };

  const onPressNextButton = () => {
    // 기록 작성 페이지로 이동
    if (selectedExhVisitId) {
      updateforIds(writeMyDiaryInfo.diaryId, selectedExhVisitId);
      navigation.navigate('WriteMyDiaryRoutes');
    }
  };

  const onPressAddDate = () => {
    // 혼자 방문한 날짜 리스트 추출
    var dates = [];

    if (value === null || myStoredDateListOfExh.length === 0) {
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

    if (value === null || myStoredDateListOfExh.length === 0) {
      return visitDateInfoList;
    }
    const dateInfoList = myStoredDateListOfExh[value].dateInfoList;
    for (let index = 0; index < dateInfoList.length; index++) {
      visitDateInfoList.push({
        index: index,
        exhVisitId: dateInfoList[index].exhVisitId,
        visitDate: dateInfoList[index].visitDate,
        weekday: !dateInfoList[index].visitDate
          ? null
          : getDateDay(dateInfoList[index].visitDate),
      });
    }
    return visitDateInfoList;
  };

  return (
    <Container>
      {/* 날짜 목록 */}
      <AddDateGroupView>
        <GroupTextWrapper>
          <GroupText flag>방문 날짜</GroupText>
          {writeMyDiaryInfo.isUpdate && (
            <GroupText>전시회 방문 날짜를 수정할 수 있습니다.</GroupText>
          )}
        </GroupTextWrapper>
        {value !== null && value === 0 && (
          <CustomTouchable onPress={onPressAddDate}>
            <AddDateText>추가</AddDateText>
          </CustomTouchable>
        )}
      </AddDateGroupView>
      <Dates>
        {value === null ? (
          <SelectMsgView>
            <SelectMsgText>모임을 선택해 주세요.</SelectMsgText>
          </SelectMsgView>
        ) : (
          <FlatList
            data={getVisitDates(value)}
            renderItem={({item}) => (
              <CustomTouchable onPress={() => onPressVisitDate(item)}>
                <DateView
                  key={item.index}
                  isSelected={item.index === selectedItemIndex}>
                  <DateText>
                    {item.visitDate === null
                      ? '기억 안 남'
                      : item.visitDate + ' (' + item.weekday + ')'}
                  </DateText>
                </DateView>
              </CustomTouchable>
            )}
            ListEmptyComponent={
              <SelectMsgView>
                <SelectMsgText>방문 날짜를 추가해주세요.</SelectMsgText>
              </SelectMsgView>
            }
          />
        )}
      </Dates>
      {selectedItemIndex !== null ? (
        <CustomTouchable onPress={onPressNextButton}>
          <NextButton isPressed={true}>전시회 선택 완료</NextButton>
        </CustomTouchable>
      ) : (
        <NextButton isPressed={false}>전시회 선택 완료</NextButton>
      )}
    </Container>
  );
};

export default ChooseVisitDateList;

/** style */
const Container = styled.View`
  flex: 1;
  padding-top: ${hp(1)}px;
  gap: ${hp(1.5)}px;
`;

const AddDateGroupView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GroupTextWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: ${hp(1.5)}px;
`;

interface GroupProps {
  flag: boolean;
}

const GroupText = styled.Text<GroupProps>`
  font-size: ${(props: GroupProps) =>
    props.flag ? `${AREA_FONT_SIZE}px` : `${rf(13)}px`};
  color: ${(props: GroupProps) =>
    props.flag ? `${DEFAULT_TEXT}` : `${MIDDLE_GREY}`};
  font-family: ${FONT_NAME};
  padding-top: ${hp(0.9)}px;
`;

const AddDateText = styled.Text`
  font-size: ${rf(15)}px;
  color: ${MAIN_COLOR};
  font-family: ${FONT_NAME};
  border-bottom-width: ${wp(0.3)}px;
  border-bottom-color: ${MAIN_COLOR};
`;

const Dates = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SelectMsgView = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SelectMsgText = styled.Text`
  font-size: ${rf(16)}px;
  color: ${MIDDLE_GREY};
  font-family: ${FONT_NAME};
  padding-top: ${hp(0.9)}px;
`;

interface DateViewProps {
  isSelected: boolean;
}

const DateView = styled.View<DateViewProps>`
  justify-content: center;
  align-items: center;
  padding-top: ${hp(1.7)}px;
  padding-bottom: ${hp(1.7)}px;
  border-bottom-width: ${ITEM_BORDER_WIDTH}px;
  border-bottom-color: ${LIGHT_GREY};
  background-color: ${(props: DateViewProps) =>
    props.isSelected ? '#fde2e0' : `${BACK_COLOR}`};
`;

const DateText = styled.Text`
  font-size: ${rf(16.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

interface NextButtonProps {
  isPressed: boolean;
}
const NextButton = styled.Text<NextButtonProps>`
  padding: ${BUTTON_PADDING}px;
  border-radius: ${BUTTON_RADIUS}px;
  text-align: center;
  background-color: ${(props: NextButtonProps) =>
    props.isPressed ? `${MAIN_COLOR}` : `${LIGHT_GREY}`};
  color: white;
  font-size: ${BUTTON_FONT_SIZE}px;
  font-family: ${FONT_NAME};
`;

const pickerStyle = StyleSheet.create({
  selected: {
    backgroundColor: '#fde2e0',
  },
});

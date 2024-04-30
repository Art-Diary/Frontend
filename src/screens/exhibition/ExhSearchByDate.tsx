// import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native';
// import styled from 'styled-components/native';
// import {SearchIcon} from '~/assets/images';
// import BackView from '~/components/common/BackView';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
// import SearchExhFrame from '../../components/exhSearch/SearchExhFrame';
// import {showToast} from '~/components/common/modal/toastConfig';
// import {useNavigation} from '@react-navigation/native';
// import {RootStackNavigationProp} from '~/App';
// import useSearchName from '~/zustand/exhibition/exhibition';
// //import {Calendar} from 'react-native-calendars';
// import CustomCalendar from '~/components/common/CustomCalendar';
// import {JoinDateWithDot, dateToString} from '~/utils/Date';
// //import ExhListOfDate from './ExhListOfDate';
// import {useFetchGatheringList} from '~/api/queries/gathering';
// import ErrorMessageView from '~/components/common/ErrorMessageView';
// import LoadingModal from '~/components/common/modal/LoadingModal';
// import {SelectCountry} from 'react-native-element-dropdown';
// //import {imageDataset} from './imageDataset';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
//import {heightPercentage as hp} from '~/components/common/ResponsiveSize';
import ExhListOfDate from '../calendar/ExhListOfDate';
import {useFetchGatheringList} from '~/api/queries/gathering';
import ErrorMessageView from '~/components/common/ErrorMessageView';
import LoadingModal from '~/components/common/modal/LoadingModal';
import {SelectCountry} from 'react-native-element-dropdown';
import {imageDataset} from '~/screens/calendar/imageDataset';
import {
  useTabIdentifierActions,
  useTabIdentifierInfo,
} from '~/zustand/tabIdentifier';
import {useIsFocused} from '@react-navigation/native';
import {calendarColor} from '~/screens/calendar/calendarColor';
import BackView from '~/components/common/BackView';
import {Calendar} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import {useSearchDateActions} from '~/zustand/exhibition/exhibition';

interface IPicker {
  label: string;
  value: string;
  image: {};
}

interface MarkedType {
  date: string;
  color: string[];
}

const ExhSearchByDate = () => {
  // const isFocused = useIsFocused();
  // const tabIdentifierInfo = useTabIdentifierInfo();
  // const {updateTab} = useTabIdentifierActions();
  const navigation = useNavigation<RootStackNavigationProp>();
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
  // 날짜 선택 selector - value
  const [value, setValue] = useState<string>('-1');
  // const {
  //   data: gatheringList,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useFetchGatheringList();

  const {updateSearchDate} = useSearchDateActions();
  //const [isPossibleSearch, SetIsPossibleSearch] = useState<boolean>(false);
  const [options, SetOptions] = useState<boolean>(false); //버튼 색변화

  useEffect(() => {
    console.log('날짜데이터:', selectedDate, ',', markedDates);
  }, [selectedDate]);

  // useEffect(() => {
  //   if (isFocused) {
  //     if (tabIdentifierInfo.tab === 'mydiary') {
  //       updateTab('calendar');
  //     }
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     var list = [];
  //     const image = {uri: imageDataset};

  //     list.push({
  //       label: '혼자',
  //       value: '-1',
  //       image: image,
  //     });
  //     for (let i = 0; i < gatheringList.length; i++) {
  //       list.push({
  //         label: gatheringList[i].gatherName,
  //         value: gatheringList[i].gatherId,
  //         image: image,
  //       });
  //     }
  //     list.push({
  //       label: '모두',
  //       value: '-2',
  //       image: image,
  //     });
  //     setItems(list);
  //   }
  // }, [isSuccess, setItems, gatheringList]);

  // useEffect(() => {
  //   // 응답 데이터가 변경될 때마다
  //   if (datas.length !== 0) {
  //     var list: MarkedType[] = [];

  //     for (let i = 0; i < datas.length; i++) {
  //       if (datas[i].scheduleInfoList !== undefined) {
  //         var colorList: string[] = [];

  //         if (value === '-2') {
  //           const infoList = datas[i].scheduleInfoList;

  //           for (let k = 0; k < infoList.length; k++) {
  //             let findColor = findGatherColor(infoList[k].gatherId);

  //             if (!colorList.includes(findColor)) {
  //               colorList.push(findColor);
  //             }
  //           }
  //         } else {
  //           colorList.push(calendarColor[0]);
  //         }
  //         list.push({
  //           date: JoinDateWithDot([
  //             Number(changeMonth.split('.')[0]),
  //             Number(changeMonth.split('.')[1]),
  //             datas[i].day,
  //           ]),
  //           color: colorList,
  //         });
  //       }
  //     }
  //     setMarkedDates(list);
  //   }
  // }, [datas]);

  // if (isError) {
  //   return <ErrorMessageView message="모임 목록 조회 실패:(" />;
  // }

  // if (isLoading) {
  //   return <LoadingModal message="모임 목록 조회 중:)" />;
  // }

  // const findGatherColor = (gatherId: number): string => {
  //   if (gatherId === null) {
  //     return calendarColor[0];
  //   }
  //   for (let i = 0; i < items.length - 1; i++) {
  //     if (Number(items[i].value) === gatherId) {
  //       return calendarColor[i];
  //     }
  //   }
  //   return 'black';
  // };

  const onPressDate = () => {
    //setKeyword(text);

    const parts = selectedDate.split('.');
    console.log('parts', parts[0], parts[1], parts[2], typeof parts[0]);
    // const dateObject = new Date(
    //   Number(parts[0]),
    //   Number(parts[1]) - 1,
    //   Number(parts[2]) + 1,
    // );
    const dateObject =
      parts[0] +
      '-' +
      ('0' + parts[1]).slice(-2) +
      '-' +
      ('0' + parts[2]).slice(-2);
    updateSearchDate(dateObject);
    navigation.goBack();
  };

  return (
    <Container>
      <BackView line={false} children={null}></BackView>
      <TextView>{'날짜 선택'}</TextView>
      <CalendarView>
        <CustomCalendar
          onSelectedDate={setSelectedDate}
          markedDates={markedDates}
          setChangeMonth={setChangeMonth}>
          {/* <SelectCountry
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
        /> */}
        </CustomCalendar>
      </CalendarView>
      <DateView>
        <TextView>{'선택한 날짜'}</TextView>
        <TextView>{selectedDate}</TextView>
      </DateView>
      <ButtonSection>
        <TouchableOpacity onPress={onPressDate}>
          <CompleteButton>{'선택 완료'}</CompleteButton>
        </TouchableOpacity>
      </ButtonSection>
      {/* <ExhListOfDate
        changeMonth={changeMonth}
        selectedDate={selectedDate}
        setDatas={setDatas}
        gatherId={Number(value)}
        items={items}
      /> */}
    </Container>
  );
};

export default ExhSearchByDate;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  //width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  padding: ${hp(3)}px;
  padding-top: ${hp(10)}px;
  justify-content: space-between; // 양 끝으로 버튼 배치
`;

const CalendarView = styled.View`
  flex: 1;
  flex-direction: column;
  height: 100%;
  background-color: #f6f6f6;
  gap: 175px;
  padding-left: ${wp(13)}px;
  padding-right: ${wp(13)}px;
`;

const DateView = styled.View`
  flex: 0.55;
  flex-direction: row;
  //width: 100%;
  background-color: #f6f6f6;
  gap: 160px;
  padding-top: ${wp(10)}px;
  /* padding-right: ${hp(5)}px;
  padding-left: ${hp(5)}px; */
`;

const TextView = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  // flex: 1;
  /* flex-direction: column;
  font-size: ${fp(17)}px;
  color: #d3d3d3;
  font-family: 'omyu pretty';*/
  padding-top: ${wp(7)}px;
  padding-bottom: ${wp(10)}px;
  padding-left: ${wp(20)}px;
`;

const UnCompleteButton = styled.Text`
  font-size: ${fp(17)}px;
  flex-direction: column;
  color: #ffffff;
  padding: ${wp(10)}px;
  font-family: 'omyu pretty';
  text-align: center;
  background-color: #979797;
  border-color: #979797;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(5)}px;
`;

const CompleteButton = styled.Text`
  font-size: ${fp(17)}px;
  flex-direction: column;
  color: #ffffff;
  padding: ${wp(10)}px;
  font-family: 'omyu pretty';
  text-align: center;
  background-color: #ff6f61;
  border-color: #ff6f61;
  border-width: ${wp(1.3)}px;
  border-radius: ${wp(5)}px;
`;

const ButtonSection = styled.View`
  //flex: 1;
  // height: 100%;
  flex-direction: column;
  //align-items: last baseline;
  padding: ${wp(10)}px;
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

import {Keyboard, TouchableOpacity, Modal} from 'react-native';
import {
  widthPercentage as wp,
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import CustomCalendar from '~/components/common/CustomCalendar';
import {JoinDateWithDot, dateToString} from '~/utils/Date';
import BackView from '~/components/common/BackView';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '~/App';
import OptionsModal from '~/components/exhibition/OptionsModal';

interface IPicker {
  label: string;
  value: string;
  image: {};
}

interface MarkedType {
  date: string;
  color: string[];
}

interface ExhSearchByDateProps {
  isVisible: boolean;
  state: string | null;
  date: string | null;
  onClose: (
    selectedOption4: string | null, //state
    selectedOption5: string | null, //date
  ) => void;
}

const ExhSearchByDate: React.FC<ExhSearchByDateProps> = ({
  isVisible,
  state,
  date,
  onClose,
}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  // 사용자가 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  // 월 변경 화살표 클릭 인식을 위한 상태 변화
  const [changeMonth, setChangeMonth] = useState(dateToString(new Date()));
  // 일정이 있는 날짜 리스트
  const [markedDates, setMarkedDates] = useState<MarkedType[]>([]);
  // api 요청에 대한 응답 데이터
  //const [datas, setDatas] = useState<any[]>([]);
  // 모임 선택 selector - item
  //const [items, setItems] = useState<IPicker[]>([]);
  // 날짜 선택 selector - value
  // const [value, setValue] = useState<string>('-1');

  //모달로 바꾸며 삭제
  //const {updateSearchDate} = useSearchDateActions();
  const [updateSearchDate, setUpdateSearchDate] = useState<string | null>(null);

  //const [isPossibleSearch, SetIsPossibleSearch] = useState<boolean>(false);
  const [options, SetOptions] = useState<boolean>(false); //버튼 색변화
  const [isOptionsModalPressed, setIsOptionsModalPressed] =
    useState<boolean>(false);
  const [selectedOption4, setSelectedOption4] = useState<string | null>(state);
  const [selectedOption5, setSelectedOption5] = useState<string | null>(date);

  useEffect(() => {
    console.log('날짜데이터:', selectedDate, ',', markedDates);
  }, [selectedDate]);

  const onPressDate = (selectedOption4: string | null) => {
    const parts = selectedDate.split('.');
    console.log('parts', parts[0], parts[1], parts[2], typeof parts[0]);

    const dateObject =
      parts[0] +
      '-' +
      ('0' + parts[1]).slice(-2) +
      '-' +
      ('0' + parts[2]).slice(-2);

    console.log('dateObject', dateObject);
    onClose(selectedOption4, dateObject);
  };

  //날짜 누를 때, 전시상태옵션이 지정되어 있으면 모달 오픈
  // 모달을 열기 위한 함수
  const optionsModalOpen = () => {
    console.log('[OptionsModalOpen] Opening OptionsModal for Field and key:');
    setIsOptionsModalPressed(true);
    setSelectedOption5(selectedDate); // 선택한 값의 key 알려주는 용도
  };

  const optionsModalClose = () => {
    //console.log('옵션4,', selectedOption4, selectedOption5);
    setIsOptionsModalPressed(false);
  };

  const onPressYes = (key: string | null) => {
    //console.log('key:', key);
    setSelectedOption4(null);
    //  pressExhState(key, isClickState.find(item => item.key === key)?.value);
    optionsModalClose();
  };

  const onPressNo = () => {
    //console.log('what?', isClickState.find(item => item.key === key)?.value);
    //  setIsOptionsModalPressed(false);
    setSelectedOption5(null);
    optionsModalClose();
    onClose(selectedOption4, selectedOption5);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Container>
        <BackView line={false} children={null}></BackView>
        <TextView>{'날짜 선택'}</TextView>
        <CalendarView>
          <CustomCalendar
            onSelectedDate={setSelectedDate}
            markedDates={markedDates}
            setChangeMonth={setChangeMonth}></CustomCalendar>
        </CalendarView>
        <DateView>
          <TextView>{'선택한 날짜'}</TextView>
          <TextView>{selectedDate}</TextView>
        </DateView>
        <ButtonSection>
          {/* {state ? (
            <TouchableOpacity onPress={() => optionsModalOpen()}>
              <CompleteButton>{'선택 완료'}</CompleteButton>
            </TouchableOpacity>
          ) : ( */}
          <TouchableOpacity onPress={() => onPressDate(state)}>
            <CompleteButton>{'선택 완료'}</CompleteButton>
          </TouchableOpacity>
          {/* )}
          {isOptionsModalPressed && (
            <OptionsModal
              handleCloseModal={optionsModalClose}
              // tkey={selectedOption4}
              onPressYes={() => onPressYes(selectedDate)}
              onPressNo={() => onPressNo()}
              message="이미 지정된 전시 진행 상황은 삭제됩니다. 
              그렇게 할까요?"
            />
          )} */}
        </ButtonSection>
      </Container>
    </Modal>
  );
};

export default ExhSearchByDate;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
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
  background-color: #f6f6f6;
  gap: 160px;
  padding-top: ${wp(10)}px;
`;

const TextView = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
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
  flex-direction: column;
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

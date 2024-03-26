import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useAddMyExhVisitDate} from '~/api/queries/mydiary';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import AddVisitDate from '~/components/visitDate/AddVisitDate';
import {changeDotToHyphen, dateToString} from '~/utils/Date';
import {
  useMySoloActions,
  useMySoloInfo,
} from '~/zustand/mydiary/mySoloStoredDates';

const AddSoloVisitDateScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const mySoloInfo = useMySoloInfo();
  // 혼자 방문한 날짜 가져오기
  const markedDates = mySoloInfo.visitDates;
  // 내 기록의 전시회 방문 날짜 추가 API
  const {updateOneVisitDate} = useMySoloActions();
  const {
    mutate: addMyExhVisitDate,
    isLoading,
    isError,
    isSuccess,
  } = useAddMyExhVisitDate(mySoloInfo.exhId, changeDotToHyphen(selectedDate));

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
    }
    if (isSuccess) {
      updateOneVisitDate(selectedDate);
      showToast('방문 날짜를 추가했습니다');
      // TODO 다음 페이지로 이동 => 이전 페이지로 이동되도록
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onClickNextButton = () => {
    addMyExhVisitDate();
  };

  return (
    <Container>
      <BackView line={false} children={null} />
      <AddVisitDate
        markedDates={markedDates}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        onClickNextButton={onClickNextButton}
      />
    </Container>
  );
};

export default AddSoloVisitDateScreen;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

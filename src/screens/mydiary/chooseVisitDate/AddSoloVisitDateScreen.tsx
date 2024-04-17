import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
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
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {calendarColor} from '~/screens/calendar/calendarColor';

interface MarkedType {
  date: string;
  color: string[];
}

const AddSoloVisitDateScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const [isForgot, setIsForgot] = useState(false);
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
  } = useAddMyExhVisitDate(
    mySoloInfo.exhId,
    isForgot ? null : changeDotToHyphen(selectedDate),
  );

  useEffect(() => {
    if (isForgot) {
      addMyExhVisitDate();
    }
  }, [isForgot]);

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

  const onClickForgotButton = () => {
    setIsForgot(true);
  };

  const markedDatesFormatChange = (markedDates: string[]): MarkedType[] => {
    var list: MarkedType[] = [];

    for (let i = 0; i < markedDates.length; i++) {
      var firstColor: string[] = [];

      firstColor.push(calendarColor[0]);
      list.push({
        date: markedDates[i],
        color: firstColor,
      });
    }
    return list;
  };

  return (
    <Container>
      <BackView line={false} children={null} />
      <AddVisitDate
        markedDates={markedDatesFormatChange(markedDates)}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        onClickNextButton={onClickNextButton}>
        <BodyView>
          <BodyText>방문 날짜가 기억 안 날 땐?</BodyText>
          {mySoloInfo.haveForgot ? (
            <ForgetText haveForgot={true}>기억 안 남</ForgetText>
          ) : (
            <TouchableOpacity onPress={onClickForgotButton}>
              <ForgetText haveForgot={false}>기억 안 남</ForgetText>
            </TouchableOpacity>
          )}
        </BodyView>
      </AddVisitDate>
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

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

const BodyText = styled.Text`
  font-size: ${fp(17)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
`;

interface ForgotProps {
  haveForgot: boolean;
}

const ForgetText = styled.Text<ForgotProps>`
  font-size: ${fp(17)}px;
  color: ${(props: ForgotProps) => (props.haveForgot ? '#D3D3D3' : '#ff6f61')};
  font-family: 'omyu pretty';
  padding-top: ${hp(5)}px;
  padding-bottom: ${hp(5)}px;
  text-decoration-line: underline;
`;

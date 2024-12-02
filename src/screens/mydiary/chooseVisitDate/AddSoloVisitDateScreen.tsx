import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {useAddMyExhVisitDate} from '~/api/queries/mydiary';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import AddVisitDate from '~/components/diary/AddVisitDate';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {
  useMySoloMarkedDatesActions,
  useMySoloMarkedDatesInfo,
} from '~/zustand/mydiary/mySoloMarkedDates';
import {
  responseFont as rf,
  heightSizePercentage as hp,
  widthSizePercentage as wp,
} from '~/components/common/ResponsiveSize';
import {calendarColor} from '~/screens/calendar/calendarColor';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {
  BACK_COLOR,
  DEFAULT_TEXT,
  LIGHT_GREY,
  MAIN_COLOR,
} from '~/components/common/colors';
import {FONT_NAME, ITEM_BORDER_WIDTH} from '~/components/common/style';
import CustomTouchable from '~/components/common/CustomTouchable';

interface MarkedType {
  date: string;
  color: string[];
}

const AddSoloVisitDateScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const mySoloMarkedDatesInfo = useMySoloMarkedDatesInfo();
  // 혼자 방문한 날짜 가져오기
  const markedDates = mySoloMarkedDatesInfo.visitDates;
  // 내 기록의 전시회 방문 날짜 추가 API
  const {updateVisitDates} = useMySoloMarkedDatesActions();
  const {
    mutate: addMyExhVisitDate,
    isLoading,
    isError,
    isSuccess,
    data: resData,
  } = useAddMyExhVisitDate();

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
    }
    if (isSuccess) {
      const data = resData.data;
      var dateList = [];

      for (var i = 0; i < data.lemgth; i++) {
        dateList.push(data[i].visitDate);
      }
      updateVisitDates(dateList);
      showToast('방문 날짜를 추가했습니다');
      // [-] 다음 페이지로 이동 => 이전 페이지로 이동되도록
      navigation.goBack();
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onClickNextButton = () => {
    addMyExhVisitDate({
      exhId: visitedExhId,
      visitDate: changeDotToHyphen(selectedDate),
    });
  };

  const onClickForgotButton = () => {
    addMyExhVisitDate({exhId: visitedExhId, visitDate: null});
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
          {mySoloMarkedDatesInfo.haveForgot ? (
            <ForgetText haveForgot={true}>기억 안 남</ForgetText>
          ) : (
            <CustomTouchable onPress={onClickForgotButton}>
              <ForgetText haveForgot={false}>기억 안 남</ForgetText>
            </CustomTouchable>
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
  background-color: ${BACK_COLOR};
`;

const BodyView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: ${wp(1.6)}px;
  padding-top: ${hp(1.6)}px;
  padding-bottom: ${hp(1.6)}px;
`;

const BodyText = styled.Text`
  font-size: ${rf(16.5)}px;
  color: ${DEFAULT_TEXT};
  font-family: ${FONT_NAME};
`;

interface ForgotProps {
  haveForgot: boolean;
}

const ForgetText = styled.Text<ForgotProps>`
  font-size: ${rf(16)}px;
  color: ${(props: ForgotProps) =>
    props.haveForgot ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  font-family: ${FONT_NAME};
  border-bottom-color: ${(props: ForgotProps) =>
    props.haveForgot ? `${LIGHT_GREY}` : `${MAIN_COLOR}`};
  border-bottom-width: ${ITEM_BORDER_WIDTH}px;
`;

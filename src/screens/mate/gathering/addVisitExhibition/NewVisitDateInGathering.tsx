import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RootStackNavigationProp} from '~/App';
import {showToast} from '~/components/common/modal/toastConfig';
import AddVisitDate from '~/components/visitDate/AddVisitDate';
import {JoinDateWithDot, changeDotToHyphen, dateToString} from '~/utils/Date';
import {calendarColor} from '~/screens/calendar/calendarColor';
import {useVisitedExhIdInfo} from '~/zustand/mydiary/mydiary';
import {useAddNewDateOfExhGathering} from '~/api/queries/gathering';
import {useEnterGatheringInfo} from '~/zustand/gathering/enterGathering';

interface MarkedType {
  date: string;
  color: string[];
}

interface NewDateProps {
  markedDates: any[];
}

const NewVisitDateInGathering: React.FC<NewDateProps> = ({markedDates}) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const visitedExhId = useVisitedExhIdInfo().exhId;
  const {enterGatheringInfo} = useEnterGatheringInfo();
  // 모임의 전시회 방문 날짜 추가 API
  const {
    mutate: addNewDateOfExhGathering,
    isLoading,
    isError,
    isSuccess,
  } = useAddNewDateOfExhGathering(
    enterGatheringInfo.gatherId,
    visitedExhId,
    changeDotToHyphen(selectedDate),
  );

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
    }
    if (isSuccess) {
      showToast('방문 날짜를 추가했습니다');
      navigation.navigate('GatheringRoutes', {
        screen: 'GatheringInfo',
        params: undefined,
      });
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onClickNextButton = () => {
    addNewDateOfExhGathering();
  };

  const markedDatesFormatChange = (markedDates: number[][]): MarkedType[] => {
    var dates: string[] = [];
    for (let i = 0; i < markedDates.length; i++) {
      dates.push(JoinDateWithDot(markedDates[i]));
    }
    var list: MarkedType[] = [];

    for (let i = 0; i < dates.length; i++) {
      var firstColor: string[] = [];

      firstColor.push(calendarColor[0]);
      list.push({
        date: dates[i],
        color: firstColor,
      });
    }
    return list;
  };

  return (
    <AddVisitDate
      markedDates={markedDatesFormatChange(markedDates)}
      selectedDate={selectedDate}
      onSelectedDate={onSelectedDate}
      onClickNextButton={onClickNextButton}
    />
  );
};

export default NewVisitDateInGathering;

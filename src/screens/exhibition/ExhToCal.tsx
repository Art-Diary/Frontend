import {useNavigation, RouteProp, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  useAddMyExhVisitDate,
  useFetchMyStoredDateListOfExh,
} from '~/api/queries/mydiary';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import {changeDotToHyphen, dateToString} from '~/utils/date';
import {calendarColor} from '~/screens/calendar/calendarColor';
import OptionsModal from '~/components/exhibition/OptionsModal';
import {BACK_COLOR} from '~/components/common/colors';
import {useDateFromExhActions} from '~/zustand/calendar/dateFromExh';
import {MyVisitedDateType, VisitedDateInfo} from '~/utils/dataTypes';
import ExhAddVisitDateCalendarFrame from '~/components/exhibition/ExhAddVisitDateCalendarFrame';
import {MarkedType} from '~/types';

type RootStackParamList = {
  ExhToCal: {exhId: number};
};

type ExhToCalProp = RouteProp<RootStackParamList, 'ExhToCal'>;

interface Props {
  route: ExhToCalProp;
}

const ExhToCal: React.FC<Props> = ({route}) => {
  const {exhId} = route.params;
  const navigation = useNavigation<RootStackNavigationProp>();
  const [selectedDate, setSelectedDate] = useState(dateToString(new Date()));
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 날짜 선택 완료 누를 시,모달 오픈
  const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false); // 날짜 선택 누를 시,모달 오픈
  const {updateDate} = useDateFromExhActions();
  const isFocused = useIsFocused();

  const {
    data: dates,
    isLoading: isDatesLoading,
    isError: isDatesError,
    isSuccess: isDatesSuccess,
    refetch: refetchDates,
  } = useFetchMyStoredDateListOfExh(exhId); //전시회 방문 날짜 목록

  const {
    mutate: addMyExhVisitDate,
    isLoading,
    isError,
    isSuccess,
  } = useAddMyExhVisitDate(exhId);

  useEffect(() => {
    if (isFocused) {
      refetchDates();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isDatesSuccess) {
      var list: string[] = [];
      dates.map((items: MyVisitedDateType) => {
        items.dateInfoList.map((item: VisitedDateInfo) => {
          if (item.visitDate != null) {
            list.push(item.visitDate);
          }
        });
        setMarkedDates(list);
      });
    }
  }, [dates]);

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
      setIsCheckModalOpen(false);
    }
    if (isSuccess) {
      setIsModalOpen(true);
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
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

  const onPressYes = () => {
    setIsModalOpen(false);
    updateDate(selectedDate);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            routes: [
              {
                name: 'Calendar',
                params: undefined,
              },
            ],
          },
        },
      ],
    });
  };

  const onPressNo = () => {
    setIsModalOpen(false);
    setIsCheckModalOpen(false);
    setMarkedDates([...markedDates, selectedDate]);
  };

  const onClickNextButton = () => {
    setIsCheckModalOpen(true);
  };
  const onPressCheckYes = () => {
    addMyExhVisitDate({exhId, visitDate: changeDotToHyphen(selectedDate)});
  };
  const onPressCheckNo = () => {
    setIsCheckModalOpen(false);
  };

  return (
    <Container>
      <BackView line={false} children={null} />
      {isModalOpen && (
        <OptionsModal
          handleCloseModal={onPressNo}
          onPressYes={onPressYes}
          onPressNo={onPressNo}
          message="캘린더로 이동할까요?"
        />
      )}
      {isCheckModalOpen && (
        <OptionsModal
          handleCloseModal={onPressCheckNo}
          onPressYes={onPressCheckYes}
          onPressNo={onPressCheckNo}
          message="해당 날짜로 정하겠습니까?"
        />
      )}
      <ExhAddVisitDateCalendarFrame
        markedDates={markedDatesFormatChange(markedDates)}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        onClickNextButton={onClickNextButton}
        selectedMssg="선택 할 날짜"
      />
    </Container>
  );
};

export default ExhToCal;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${BACK_COLOR};
`;

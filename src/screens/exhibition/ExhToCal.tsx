import {useNavigation, RouteProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {RootStackNavigationProp} from '~/App';
import {
  useAddMyExhVisitDate,
  useFetchMyStoredDateListOfExh,
} from '~/api/queries/mydiary';
import BackView from '~/components/common/BackView';
import {showToast} from '~/components/common/modal/toastConfig';
import AddVisitDate from '~/components/diary/AddVisitDate';
import {changeDotToHyphen, JoinDateWithDot, dateToString} from '~/utils/Date';
import {
  heightPercentage as hp,
  fontPercentage as fp,
} from '~/components/common/ResponsiveSize';
import {calendarColor} from '~/screens/calendar/calendarColor';
import OptionsModal from '~/components/exhibition/OptionsModal';

interface MarkedType {
  date: string;
  color: string[];
}

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
  const [isForgot, setIsForgot] = useState(false);
  const visitedExhId = exhId;
  const [markedDates, setMarkedDates] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //날짜 선택 누를 시,모달 오픈

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
  } = useAddMyExhVisitDate(
    visitedExhId,
    isForgot ? null : changeDotToHyphen(selectedDate),
  );

  useEffect(() => {
    if (isDatesSuccess) {
      var list: string[] = [];
      dates.map((items: any) => {
        items.dateInfoList.map((item: any) => {
          if (item.visitDate != null) {
            list.push(JoinDateWithDot(item.visitDate));
          }
        });
        setMarkedDates(list);
      });
    }
  }, [dates]);

  useEffect(() => {
    if (isError) {
      showToast('방문 가능한 날짜가 아닙니다');
    }
    if (isSuccess) {
      showToast('방문 날짜를 추가했습니다');
      setIsModalOpen(true);
    }
  }, [isError, isSuccess]);

  const onSelectedDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
  };

  const onClickNextButton = () => {
    addMyExhVisitDate();
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

  const optionsModalClose = () => {
    setIsModalOpen(false);
  };

  const onPressYes = () => {
    optionsModalClose();
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
    optionsModalClose();
    navigation.goBack();
  };

  return (
    <Container>
      <BackView line={false} children={null} />
      {isModalOpen && (
        <OptionsModal
          handleCloseModal={optionsModalClose}
          onPressYes={() => onPressYes()}
          onPressNo={() => onPressNo()}
          message="캘린더로 이동할까요?"
        />
      )}
      <AddVisitDate
        markedDates={markedDatesFormatChange(markedDates)}
        selectedDate={selectedDate}
        onSelectedDate={onSelectedDate}
        onClickNextButton={onClickNextButton}
        selectedMssg="선택 할 날짜"></AddVisitDate>
    </Container>
  );
};

export default ExhToCal;

/** style */
const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: #f6f6f6;
`;

const Title = styled.Text`
  font-size: ${fp(19)}px;
  color: #3c4045;
  font-family: 'omyu pretty';
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
